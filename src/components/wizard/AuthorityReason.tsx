import React from 'react';
import { HelpCircle } from 'lucide-react';

interface AuthorityReasonProps {
  reason: string;
}

export const AuthorityReason: React.FC<AuthorityReasonProps> = ({ reason }) => {
  return (
    <div className="mt-4 bg-slate-50/80 rounded-2xl p-4 border border-slate-200/70">
      <div className="flex items-start gap-2">
        <HelpCircle className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-0.5">
            Why this authority?
          </span>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {reason}
          </p>
        </div>
      </div>
    </div>
  );
};
