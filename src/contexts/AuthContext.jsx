import React, { createContext, useContext, useEffect, useState } from 'react';
import bcrypt from 'bcryptjs';

const AuthContext = createContext();

const STORAGE_KEYS = {
  USERS: 'bloodDonation_users',
  CURRENT_USER: 'bloodDonation_currentUser'
};

// Sample admin user
const defaultUsers = [
  {
    id: 'admin-1',
    email: 'admin@bloodconnect.org',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    name: 'Admin User',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00.000Z'
  }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize users if not exists
    const storedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
    if (!storedUsers) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaultUsers));
    }

    // Check for existing session
    const currentUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (currentUser) {
      try {
        const userData = JSON.parse(currentUser);
        setUser(userData);
      } catch (error) {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
      const foundUser = users.find(u => u.email === email);
      
      if (!foundUser) {
        return false;
      }

      const isValidPassword = await bcrypt.compare(password, foundUser.password);
      if (!isValidPassword) {
        return false;
      }

      // Update last login
      const updatedUser = {
        ...foundUser,
        lastLogin: new Date().toISOString()
      };
      
      const updatedUsers = users.map(u => 
        u.id === foundUser.id ? updatedUser : u
      );
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updatedUsers));

      // Remove password from user object
      const { password: _, ...userWithoutPassword } = updatedUser;
      setUser(userWithoutPassword);
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userWithoutPassword));
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
      
      // Check if user already exists
      if (users.find(u => u.email === userData.email)) {
        return false;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      const newUser = {
        id: Date.now().toString(),
        email: userData.email,
        password: hashedPassword,
        name: userData.name,
        role: userData.role,
        bloodGroup: userData.bloodGroup,
        city: userData.city,
        phone: userData.phone,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

      // Auto login after registration
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userWithoutPassword));
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const updateProfile = async (userData) => {
    try {
      if (!user) return false;

      const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
      const updatedUser = { ...user, ...userData };
      
      const updatedUsers = users.map(u => 
        u.id === user.id ? { ...u, ...userData } : u
      );
      
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updatedUsers));
      setUser(updatedUser);
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(updatedUser));
      
      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  };

  const value = {
    user,
    login,
    register,
    logout,
    isLoading,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
