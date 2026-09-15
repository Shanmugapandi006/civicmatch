"use client"
import React from 'react';
import Link from 'next/link';
import { useAuth } from './AuthContext';
import { Button } from './Button';
import { Globe, UserCircle } from 'lucide-react';

export function Navbar() {
  const { user, setAuthModalOpen, logout } = useAuth();

  return (
    <header className="w-full px-8 py-5 flex justify-between items-center bg-surface border-b border-border">
      <Link href="/" className="flex items-center gap-2 text-primary-custom font-bold text-2xl">
        <Globe size={28} className="text-primary-custom" />
        <span>Civicmatch</span>
      </Link>
      
      <nav className="hidden md:flex items-center gap-8 text-base font-medium text-text-main">
        <Link href="/" className="hover:text-primary-custom transition-colors">Home</Link>
        <Link href="/interview" className="hover:text-primary-custom transition-colors">Find Schemes</Link>
        <Link href="/explore" className="hover:text-primary-custom transition-colors">Explore</Link>
        {user && <Link href="/history" className="hover:text-primary-custom transition-colors">History</Link>}
      </nav>

      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
              <UserCircle size={18} className="text-secondary" />
              <span className="text-base font-semibold text-text-main truncate max-w-[100px]">
                {user.name}
              </span>
            </div>
            <button 
              onClick={logout}
              className="text-sm font-medium text-text-light hover:text-error transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <Button variant="outline" size="sm" onClick={() => setAuthModalOpen(true)} className="rounded-full">
            Login
          </Button>
        )}
      </div>
    </header>
  );
}
