import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ConfidenceGauge } from '../components/ConfidenceGauge';
import { EvidenceGraph } from '../components/EvidenceGraph';
import { ArrowLeft, CheckCircle, FileText, Download } from 'lucide-react';
import './SchemeDetailPage.css';

const SchemeDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data based on ID
  const scheme = {
    id: id,
    name: "PM Kisan Samman Nidhi",
    benefit: "₹6,000 / year",
    confidence: 95,
    description: "Income support to all landholding farmers' families in the country to supplement their financial needs for procuring various inputs related to agriculture.",
    counterfactual: "If your land holding was verified instantly via DigiLocker, confidence would be 100%.",
    documents: [
      "Aadhaar Card",
      "Bank Account Details",
      "Land Ownership Documents"
    ]
  };

  return (
    <div className="scheme-detail-page container animate-fade-in pb-4">
      <header className="results-header flex items-center gap-4 mt-2 mb-4">
        <Button variant="outline" size="sm" className="btn-icon" onClick={() => navigate('/results')}>
          <ArrowLeft size={20} />
        </Button>
      </header>

      <div className="flex flex-col items-center text-center mb-4">
        <ConfidenceGauge score={scheme.confidence} size={150} />
        <div className="eligibility-badge mt-2">
          <CheckCircle size={18} />
          <span>You are highly likely to be eligible</span>
        </div>
      </div>

      <h1 className="scheme-title text-center mb-1">{scheme.name}</h1>
      <h2 className="scheme-benefit-large text-center mb-4">{scheme.benefit}</h2>

      <p className="scheme-description mb-4">
        {scheme.description}
      </p>

      <div className="mb-4">
        <EvidenceGraph />
      </div>

      <Card className="mb-4 counterfactual-card">
        <div className="flex items-start gap-2">
          <span className="text-2xl">💡</span>
          <div>
            <h4 className="counterfactual-title">Did you know?</h4>
            <p className="counterfactual-text">{scheme.counterfactual}</p>
          </div>
        </div>
      </Card>

      <section className="documents-section mb-4">
        <h3 className="section-title mb-2">Documents Needed</h3>
        <ul className="document-list">
          {scheme.documents.map((doc, i) => (
            <li key={i} className="flex items-center gap-2">
              <FileText size={18} color="var(--color-primary-light)" />
              <span>{doc}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="cta-group flex flex-col gap-2 mt-4">
        <Button variant="accent" size="lg" className="w-full">
          Start Application
        </Button>
        <Button variant="outline" size="lg" className="w-full">
          <Download size={20} /> Download Checklist
        </Button>
      </div>
    </div>
  );
};

export default SchemeDetailPage;
