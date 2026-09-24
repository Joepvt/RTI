import React from 'react';
import { Download } from 'lucide-react';

interface ExportButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ onClick, disabled }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-sm sm:text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.99] transition-all shadow-sm shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
    >
      <Download className="w-4 h-4" />
      <span>Export RTI</span>
    </button>
  );
};
