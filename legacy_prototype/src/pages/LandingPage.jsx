import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page animate-fade-in">
      <header className="header container flex justify-between items-center">
        <div className="logo flex items-center gap-2">
          <Globe className="text-primary" size={32} color="var(--color-primary)" />
          <h1 style={{ fontSize: '1.5rem', color: 'var(--color-primary)' }}>SchemeSetu</h1>
        </div>
        <div className="language-switch">
          <select className="lang-select">
            <option>English</option>
            <option>हिंदी (Hindi)</option>
            <option>தமிழ் (Tamil)</option>
          </select>
        </div>
      </header>

      <main className="hero-section container mt-4 flex flex-col items-center text-center gap-4">
        <div className="hero-content">
          <h2 className="hero-title">Find Government Schemes You Deserve. Instantly.</h2>
          <p className="hero-subtitle">
            Answer a few simple questions and let our AI find the exact benefits you qualify for. No complex forms, just clear answers.
          </p>
          
          <Button 
            variant="accent" 
            size="lg" 
            className="cta-button mt-2"
            onClick={() => navigate('/interview')}
          >
            Find Schemes in 2 Minutes <ArrowRight size={20} />
          </Button>
        </div>

        <div className="trust-signals mt-4 flex justify-center gap-4 wrap">
          <div className="trust-badge">
            <ShieldCheck size={20} color="var(--color-success)" />
            <span>MyScheme Data</span>
          </div>
          <div className="trust-badge">
            <Zap size={20} color="var(--color-accent)" />
            <span>AI Powered</span>
          </div>
          <div className="trust-badge">
            <Globe size={20} color="var(--color-primary)" />
            <span>Open & Free</span>
          </div>
        </div>

        <div className="hero-visual mt-4 glass">
           {/* Placeholder for beautiful illustration */}
           <div className="mock-illustration">
              <div className="citizen-icon">🧑🏽‍🌾</div>
              <div className="connection-lines"></div>
              <div className="scheme-icon">💰</div>
           </div>
           <p className="visual-caption">Citizen to Scheme Matching</p>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
