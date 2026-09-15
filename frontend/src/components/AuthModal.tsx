"use client"
import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Button } from './Button';
import { X, User, Lock, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function AuthModal() {
  const { isAuthModalOpen, setAuthModalOpen, login } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup' | 'success'>('login');
  
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'signup') {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      // Save new user
      const users = JSON.parse(localStorage.getItem('schemeSetuUsers') || '[]');
      if (users.find((u: any) => u.name === name)) {
        setError('User already exists. Please login.');
        return;
      }
      users.push({ name, password });
      localStorage.setItem('schemeSetuUsers', JSON.stringify(users));
      
      setMode('success');
      setTimeout(() => {
        login({ name });
        closeModal();
      }, 1500);
      
    } else if (mode === 'login') {
      // Verify user
      const users = JSON.parse(localStorage.getItem('schemeSetuUsers') || '[]');
      const user = users.find((u: any) => u.name === name && u.password === password);
      
      if (user) {
        setMode('success');
        setTimeout(() => {
          login({ name: user.name });
          closeModal();
        }, 1500);
      } else {
        setError('Invalid name or password');
      }
    }
  };

  const closeModal = () => {
    setAuthModalOpen(false);
    setTimeout(() => {
      setMode('login');
      setName('');
      setPassword('');
      setConfirmPassword('');
      setError('');
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-sm bg-surface rounded-2xl shadow-2xl border border-border overflow-hidden relative"
      >
        <button 
          onClick={closeModal}
          className="absolute top-4 right-4 p-1 text-text-light hover:text-text-main rounded-full hover:bg-slate-100 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-primary-custom mb-1">
            {mode === 'success' ? 'Welcome!' : mode === 'login' ? 'Login' : 'Create Account'}
          </h2>
          <p className="text-sm text-text-light mb-6">
            {mode === 'login' && 'Enter your name and password'}
            {mode === 'signup' && 'Sign up to save your progress'}
            {mode === 'success' && 'Successfully authenticated.'}
          </p>

          <AnimatePresence mode="wait">
            {mode !== 'success' && (
              <motion.form 
                key="auth-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleAuth} 
                className="flex flex-col gap-4"
              >
                {error && (
                  <div className="bg-error/10 text-error text-sm p-2 rounded-lg border border-error/20">
                    {error}
                  </div>
                )}
                
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" size={20} />
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-custom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" size={20} />
                  <input 
                    type="password" 
                    placeholder="Password" 
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-custom"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {mode === 'signup' && (
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" size={20} />
                    <input 
                      type="password" 
                      placeholder="Confirm Password" 
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-custom"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                )}

                <Button variant="accent" size="lg" type="submit" className="w-full rounded-xl text-lg mt-2">
                  {mode === 'login' ? 'Login' : 'Create Account'}
                </Button>
                
                <div className="text-center mt-2">
                  {mode === 'login' ? (
                    <button type="button" onClick={() => { setMode('signup'); setError(''); }} className="text-sm text-secondary font-medium">
                      Don't have an account? Sign Up
                    </button>
                  ) : (
                    <button type="button" onClick={() => { setMode('login'); setError(''); }} className="text-sm text-secondary font-medium">
                      Already have an account? Login
                    </button>
                  )}
                </div>
              </motion.form>
            )}

            {mode === 'success' && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-8 gap-4"
              >
                <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center">
                   <CheckCircle2 size={32} className="text-success" />
                </div>
                <p className="font-semibold text-text-main">Logging you in...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
