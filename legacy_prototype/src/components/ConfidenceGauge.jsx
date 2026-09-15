import React from 'react';

export const ConfidenceGauge = ({ score = 85, size = 120 }) => {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  let color = 'var(--color-success)';
  if (score < 50) color = 'var(--color-error)';
  else if (score < 80) color = 'var(--color-warning)';

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--color-border)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
          strokeLinecap="round"
        />
      </svg>
      <div style={{ position: 'absolute', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-text)' }}>
        {score}%
      </div>
    </div>
  );
};
