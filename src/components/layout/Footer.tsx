import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-slate-200/80 bg-white py-8 px-4 sm:px-6 no-print">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2 text-slate-700">
          <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <span className="text-sm font-semibold tracking-tight">RTI Easy</span>
          <span className="text-xs text-slate-400">&bull; Open Civic Portfolio</span>
        </div>

        <p className="text-xs text-slate-500 max-w-md">
          <Info className="w-3.5 h-3.5 inline mr-1 text-slate-400 -mt-0.5" />
          RTI Easy is an independent educational tool. It does not provide legal advice or submit applications automatically.
        </p>

        <div className="text-xs text-slate-400">
          First-Year CS Portfolio &bull; 100% Client-Side Privacy
        </div>
      </div>
    </footer>
  );
};
