import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Mic, Send, ChevronRight, X } from 'lucide-react';
import './InterviewPage.css';

const questions = [
  { id: 1, text: "What is your primary occupation?", options: ["Farmer", "Student", "Business", "Unemployed"] },
  { id: 2, text: "What is your annual family income?", options: ["Less than ₹1 Lakh", "₹1 Lakh - ₹2.5 Lakhs", "More than ₹2.5 Lakhs"] },
  { id: 3, text: "Do you belong to any specific social category?", options: ["General", "SC/ST", "OBC", "Minority"] }
];

const InterviewPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isListening, setIsListening] = useState(false);

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [questions[currentStep].id]: answer });
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 400); // slight delay for feel
    } else {
      navigate('/results');
    }
  };

  const handleSkip = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/results');
    }
  };

  const progress = ((currentStep) / questions.length) * 100;

  return (
    <div className="interview-page app-container animate-fade-in">
      <header className="interview-header container">
        <div className="flex justify-between items-center mb-2">
          <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="btn-icon">
            <X size={20} />
          </Button>
          <div className="progress-text">
            {currentStep + 1} of {questions.length} questions
          </div>
          <select className="lang-select-small">
            <option>EN</option>
            <option>HI</option>
          </select>
        </div>
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </header>

      <main className="chat-container container flex-col">
        <div className="chat-history">
          {questions.slice(0, currentStep).map((q, i) => (
            <div key={q.id} className="chat-pair">
              <div className="chat-bubble ai-bubble">{q.text}</div>
              <div className="chat-bubble user-bubble">{answers[q.id] || "Skipped"}</div>
            </div>
          ))}
          
          <div className="chat-bubble ai-bubble active-question">
            {questions[currentStep].text}
          </div>
        </div>

        <div className="chat-input-area">
          <div className="quick-replies flex wrap gap-2 justify-center mb-4">
            {questions[currentStep].options.map((opt) => (
              <Button key={opt} variant="outline" onClick={() => handleAnswer(opt)}>
                {opt}
              </Button>
            ))}
          </div>

          <div className="input-controls flex items-center justify-between gap-2">
            <Button variant="outline" className="skip-btn" onClick={handleSkip}>
              I don't know
            </Button>
            <button 
              className={`mic-button ${isListening ? 'listening' : ''}`}
              onClick={() => setIsListening(!isListening)}
            >
              <Mic size={32} color="white" />
            </button>
            <Button variant="primary" className="btn-icon">
               <Send size={20} />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewPage;
