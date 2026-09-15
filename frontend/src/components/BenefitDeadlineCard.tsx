import React from 'react';
import { Calendar, IndianRupee } from 'lucide-react';

interface BenefitDeadlineCardProps {
  prizeAmount: string;
  deadlineStatus: 'open' | 'closing_soon' | 'deadline_set';
  deadlineText: string;
}

export function BenefitDeadlineCard({ prizeAmount, deadlineStatus, deadlineText }: BenefitDeadlineCardProps) {
  let statusColor = "bg-success/15 text-success border-success/30";
  let dotColor = "bg-success";
  
  if (deadlineStatus === 'closing_soon') {
    statusColor = "bg-error/15 text-error border-error/30";
    dotColor = "bg-error animate-pulse";
  } else if (deadlineStatus === 'deadline_set') {
    statusColor = "bg-warning/15 text-warning-custom border-warning/30";
    dotColor = "bg-warning-custom";
  }

  return (
    <div className="flex flex-col gap-2 w-full mb-4">
      {/* Prize Amount Card */}
      <div className="bg-gradient-to-r from-amber-50 to-amber-100/50 border border-amber-200 rounded-xl p-3 flex items-center gap-3 shadow-sm">
        <div className="w-10 h-10 rounded-full bg-accent-custom flex items-center justify-center shrink-0 shadow-inner">
          <IndianRupee size={22} className="text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Benefit Amount</span>
          <span className="text-xl font-bold text-accent-custom leading-tight">{prizeAmount}</span>
        </div>
      </div>

      {/* Deadline Badge */}
      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${statusColor}`}>
        <Calendar size={16} className="shrink-0" />
        <span className="text-sm font-semibold flex-1">{deadlineText}</span>
        <div className={`w-2.5 h-2.5 rounded-full ${dotColor} shrink-0`}></div>
      </div>
    </div>
  );
}
