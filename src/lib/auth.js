import { supabase } from './supabase';

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
        .maybeSingle();

      if (profileError) throw profileError;
      if (!profileData) {
        throw new Error("Account corrupted (Your initial registration was stopped by a database rule). Please delete your account in Supabase or use a new email to re-register.");
      }

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
  },

  // Request Password Reset OTP
  resetPasswordRequest: async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return true;
    } catch (error) {
      throw new Error(error.message || 'Failed to send OTP');
    }
  },

  // Verify OTP and Update Password
  verifyOtpAndUpdatePassword: async (email, token, newPassword) => {
    try {
      // For password reset, type is 'recovery'
      const { error: otpError } = await supabase.auth.verifyOtp({ email, token, type: 'recovery' });
      if (otpError) throw otpError;

      // Update the user's password using the active session from OTP
      const { error: pwdError } = await supabase.auth.updateUser({ password: newPassword });
      if (pwdError) throw pwdError;

      return true;
    } catch (error) {
      throw new Error(error.message || 'Failed to verify OTP or update password');
    }
  }
};
