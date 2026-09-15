import React, { useState } from 'react';
import './EvidenceGraph.css';

export const EvidenceGraph = () => {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className="evidence-graph-container">
      <div className="graph-header flex justify-between items-center mb-4">
        <h3 style={{ margin: 0, color: 'var(--color-primary)' }}>Eligibility Evidence</h3>
        <button 
          className="toggle-explainer"
          onClick={() => setShowExplanation(!showExplanation)}
        >
          {showExplanation ? "Hide Details" : "Explain AI"}
        </button>
      </div>

      <div className="graph-visual glass p-4 rounded-lg">
        {/* Simplified visual representation of the graph */}
        <div className="graph-row flex justify-between items-center relative">
          <div className="graph-node attribute">
            <span className="node-label">Farmer</span>
            <span className="node-value">Occupation</span>
          </div>
          <div className="graph-edge matched"></div>
          <div className="graph-node rule">
            <span className="node-label">Rule: Agriculture</span>
          </div>
          <div className="graph-edge matched"></div>
          <div className="graph-node scheme matched-node">
            <span className="node-label">PM-KISAN</span>
          </div>
        </div>

        <div className="graph-row flex justify-between items-center relative mt-4">
          <div className="graph-node attribute">
            <span className="node-label">&lt; ₹2L</span>
            <span className="node-value">Income</span>
          </div>
          <div className="graph-edge matched"></div>
          <div className="graph-node rule">
            <span className="node-label">Rule: Low Income</span>
          </div>
          <div className="graph-edge matched"></div>
          <div className="graph-node scheme matched-node opacity-0">
            {/* hidden for alignment */}
          </div>
        </div>
        
        {/* Animated particle on edges to show flow */}
        <div className="particle"></div>
      </div>

      {showExplanation && (
        <div className="explanation-panel mt-4 animate-fade-in">
          <h4>Government Clause Citation:</h4>
          <p className="citation">
            "As per Section 4(a) of PM-KISAN guidelines, all landholding farmers' families having cultivable landholding... are eligible."
          </p>
          <div className="confidence-breakdown mt-2">
            <div className="flex justify-between text-sm">
              <span>Data Source Reliability (MyScheme)</span>
              <span className="text-success">98%</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span>Rule Matching Confidence</span>
              <span className="text-success">95%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
