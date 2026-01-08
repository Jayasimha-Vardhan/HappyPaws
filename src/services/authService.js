// Local mock auth service - stores users in localStorage for demo
const USERS_STORAGE_KEY = 'app_users';

const getStoredUsers = () => {
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [
    { id: 1, name: 'Admin', email: 'admin@petcare.com', password: 'admin123', role: 'Admin' },
    { id: 2, name: 'Adil', email: 'adil@gmail.com', password: 'password123', role: 'Pet Owner' },
    { id: 3, name: 'Dr. Sarah Khan', email: 'sarah@vetclinic.com', password: 'vet123', role: 'Vet', specialty: 'Surgery', clinic: 'HappyPaws Clinic', phone: '+1 (555) 123-4567', license: 'VET-001' },
  ];
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

export const authService = {
  // Register a new user
  register: (name, email, password, role = 'Pet Owner', meta = {}) => {
    const users = getStoredUsers();
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
      throw new Error('Email already registered');
    }
    
    const newUser = Object.assign({
      id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
      name,
      email,
      password,
      role,
    }, meta);
    
    users.push(newUser);
    saveUsers(users);
    return newUser;
  },

  // Login user by username (accepts email or name as username)
  // login accepts optional extras for role-specific checks
  login: (username, password, extras = {}) => {
    const users = getStoredUsers();
    const user = users.find(u => (u.email === username || u.name === username) && u.password === password);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // if logging in as vet, verify license if provided
    if ((user.role || '').toString().toLowerCase() === 'vet') {
      if (extras.license && extras.license !== user.license) {
        throw new Error('Invalid license');
      }
    }

    return user;
  },

  // Get all users (for testing)
  getAllUsers: () => {
    return getStoredUsers();
  },
};
