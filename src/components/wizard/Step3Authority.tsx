import React from 'react';
import { Authority } from '../../types/rti';
import { AuthorityCard } from './AuthorityCard';
import { LoadingState } from '../common/LoadingState';

interface Step3AuthorityProps {
  isLoading: boolean;
  authority: Authority | null;
  confidence: 'High' | 'Likely match' | 'Moderate';
  reason: string;
  onConfirm: () => void;
  onSelectAuthority: (newAuthority: Authority) => void;
}

export const Step3Authority: React.FC<Step3AuthorityProps> = ({
  isLoading,
  authority,
  confidence,
  reason,
  onConfirm,
  onSelectAuthority
}) => {
  if (isLoading || !authority) {
    return (
      <div className="w-full max-w-xl mx-auto py-12">
        <LoadingState
          message="Finding the likely public authority..."
          subMessage="Analyzing keywords, jurisdictional levels, and public authority mandates."
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 pb-20 sm:pb-8 animate-fade-in">
      {/* Title & Introduction */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Authority Match
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          RTI requests must be addressed to the specific public authority holding the records.
        </p>
      </div>

      {/* Authority Card with confidence badge, explanation, and manual override */}
      <AuthorityCard
        authority={authority}
        confidence={confidence}
        reason={reason}
        onConfirm={onConfirm}
        onSelectAuthority={onSelectAuthority}
      />
    </div>
  );
};
