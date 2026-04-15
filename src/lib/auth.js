import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const SESSION_KEY = 'hostel_care_session';

export const authService = {
  // Register a new user
  register: async (userData) => {
    try {
      // Register with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      });

      if (authError) throw authError;

      // Insert user profile into users table
      const { data: profileData, error: profileError } = await supabase
        .from('users')
        .insert([
          {
            id: authData.user.id,
            email: userData.email,
            role: userData.role,
            registration_number: userData.registration_number,
            staff_id: userData.staff_id,
            warden_id: userData.warden_id,
            supervisor_id: userData.supervisor_id,
            name: userData.name,
            hostel_id: userData.hostel_id,
            category: userData.category,
          }
        ])
        .select();

      if (profileError) throw profileError;

      return profileData[0];
    } catch (error) {
      throw new Error(error.message || 'Registration failed');
    }
  },

  // Login a user
  login: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Get user profile
      const { data: profileData, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError) throw profileError;

      // Save session
      const sessionData = {
        ...profileData,
        authUser: data.user,
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));

      return sessionData;
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  },

  // Logout
  logout: async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem(SESSION_KEY);
    } catch (error) {
      throw new Error(error.message || 'Logout failed');
    }
  },

  // Get current user session
  getCurrentUser: () => {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  },

  // Check if logged in
  isAuthenticated: () => {
    return !!localStorage.getItem(SESSION_KEY);
  },

  // Get Supabase auth session
  getAuthSession: async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  }
};
