"use client"
import React, { useEffect, useState } from "react"

export function ConfidenceGauge({ score = 85, size = 120 }) {
  const [offset, setOffset] = useState(0)
  const strokeWidth = 10
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI

  useEffect(() => {
    // Animate to score
    const targetOffset = circumference - (score / 100) * circumference
    setOffset(targetOffset)
  }, [score, circumference])

  let color = "#10B981" // success
  if (score < 50) color = "#EF4444" // error
  else if (score < 80) color = "#F59E0B" // warning

  return (
    <div style={{ position: "relative", width: size, height: size }} className="flex items-center justify-center">
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E2E8F0"
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
          style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute text-2xl font-bold text-slate-800">
        {score}%
      </div>
    </div>
  )
}
