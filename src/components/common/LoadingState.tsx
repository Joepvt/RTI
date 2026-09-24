import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';

interface LoadingStateProps {
  message: string;
  subMessage?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message,
  subMessage = 'This takes just a moment...'
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center animate-fade-in">
      <div className="relative mb-5">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm animate-pulse-glow">
          <Loader2 className="w-7 h-7 animate-spin text-blue-600" />
        </div>
        <div className="absolute -top-1 -right-1 bg-white p-1 rounded-full shadow-xs border border-blue-100">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </div>
      </div>
      
      <h3 className="text-base sm:text-lg font-semibold text-slate-800 tracking-tight mb-1">
        {message}
      </h3>
      <p className="text-xs sm:text-sm text-slate-500 max-w-xs">
        {subMessage}
      </p>
    </div>
  );
};
