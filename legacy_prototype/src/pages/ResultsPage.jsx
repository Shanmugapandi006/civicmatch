import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ConfidenceGauge } from '../components/ConfidenceGauge';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import './ResultsPage.css';

const ResultsPage = () => {
  const navigate = useNavigate();

  const eligibleSchemes = [
    {
      id: 1,
      name: "PM Kisan Samman Nidhi",
      benefit: "₹6,000 / year",
      confidence: 95,
      reason: "Matches your occupation (Farmer) and income bracket."
    },
    {
      id: 2,
      name: "Ayushman Bharat PM-JAY",
      benefit: "₹5 Lakh Health Cover",
      confidence: 88,
      reason: "Based on your income and social category."
    }
  ];

  const almostEligible = [
    {
      id: 3,
      name: "Kisan Credit Card",
      benefit: "Subsidized Loan",
      confidence: 40,
      gap: "Requires land ownership details."
    }
  ];

  return (
    <div className="results-page container animate-fade-in pb-4">
      <header className="results-header flex items-center gap-4 mt-2 mb-4">
        <Button variant="outline" size="sm" className="btn-icon" onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
        </Button>
        <h1 style={{ fontSize: '1.5rem', color: 'var(--color-primary)' }}>Your Matches</h1>
      </header>

      <section className="results-section">
        <h2 className="section-title">Schemes You Qualify For</h2>
        <div className="flex flex-col gap-4 mt-2">
          {eligibleSchemes.map(scheme => (
            <Card key={scheme.id} className="scheme-card eligible">
              <div className="flex justify-between items-start">
                <div className="scheme-info">
                  <h3 className="scheme-name">{scheme.name}</h3>
                  <div className="scheme-benefit">{scheme.benefit}</div>
                  <p className="scheme-reason">{scheme.reason}</p>
                </div>
                <div className="scheme-gauge">
                  <ConfidenceGauge score={scheme.confidence} size={70} />
                </div>
              </div>
              <Button 
                variant="accent" 
                className="w-full mt-4 justify-between"
                onClick={() => navigate(`/scheme/${scheme.id}`)}
              >
                View Proof & Apply <ChevronRight size={20} />
              </Button>
            </Card>
          ))}
        </div>
      </section>

      <section className="results-section mt-4">
        <h2 className="section-title text-text-light">Almost Eligible</h2>
        <div className="flex flex-col gap-4 mt-2">
          {almostEligible.map(scheme => (
            <Card key={scheme.id} className="scheme-card almost-eligible bg-background border-border">
              <div className="flex justify-between items-start">
                <div className="scheme-info">
                  <h3 className="scheme-name">{scheme.name}</h3>
                  <div className="scheme-benefit text-text-light">{scheme.benefit}</div>
                  <div className="gap-explanation mt-1">
                    <span className="gap-label">Missing:</span> {scheme.gap}
                  </div>
                </div>
                <div className="scheme-gauge opacity-70">
                  <ConfidenceGauge score={scheme.confidence} size={60} />
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={() => navigate(`/scheme/${scheme.id}`)}
              >
                See how to qualify
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ResultsPage;
