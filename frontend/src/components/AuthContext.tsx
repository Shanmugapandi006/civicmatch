"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('schemeSetuActiveUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse active user from localStorage");
      }
    }
  }, []);

  const login = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('schemeSetuActiveUser', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('schemeSetuActiveUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthModalOpen, setAuthModalOpen }}>
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
