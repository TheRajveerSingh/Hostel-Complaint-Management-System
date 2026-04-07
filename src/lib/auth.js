const USERS_KEY = 'hostel_care_users';
const SESSION_KEY = 'hostel_care_session';

// Mock Auth Utility
const seedDefaults = () => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  if (users.length === 0) {
    const defaults = [
      { supervisor_id: 'admin', password: 'admin', role: 'supervisor', name: 'System Admin' },
      { warden_id: 'warden1', password: 'password', role: 'warden', name: 'Warden A', hostel_id: 'M-Block Hostel' },
      { staff_id: 'staff1', password: 'password', role: 'staff', name: 'Staff X', category: 'electrician' },
      { registration_number: 'student1', password: 'password', role: 'student', name: 'Student Y', hostel_id: 'M-Block Hostel' }
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(defaults));
  }
};

seedDefaults();

export const authService = {
  // Register a new user
  register: (userData) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    
    // Check if user already exists (by ID or registration number)
    const exists = users.find(u => {
      // Only compare fields if they are present in both the new user and existing user
      if (userData.registration_number && u.registration_number === userData.registration_number) return true;
      if (userData.staff_id && u.staff_id === userData.staff_id) return true;
      if (userData.warden_id && u.warden_id === userData.warden_id) return true;
      if (userData.supervisor_id && u.supervisor_id === userData.supervisor_id) return true;
      return false;
    });

    if (exists) {
      throw new Error('User already exists with these credentials.');
    }

    users.push(userData);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return userData;
  },

  // Login a user
  login: (id, password, role) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    
    const user = users.find(u => {
      const matchesId = (u.registration_number === id && role === 'student') || 
                         (u.staff_id === id && role === 'staff') || 
                         (u.warden_id === id && role === 'warden') || 
                         (u.supervisor_id === id && role === 'supervisor');
      return matchesId && u.password === password;
    });

    if (!user) {
      throw new Error('Invalid credentials. Please register if you haven\'t already.');
    }

    // Save session
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return user;
  },

  // Logout
  logout: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  // Get current user session
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  },

  // Check if logged in
  isAuthenticated: () => {
    return !!localStorage.getItem(SESSION_KEY);
  }
};
