import React, { useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface QuestionInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

export const QuestionInput: React.FC<QuestionInputProps> = ({
  value,
  onChange,
  onSubmit,
  isLoading = false
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim().length > 0 && !isLoading) {
      onSubmit();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (value.trim().length > 0 && !isLoading) {
        onSubmit();
      }
    }
  };

  const isValid = value.trim().length >= 8;

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all">
        <label
          htmlFor="user-question"
          className="block text-lg sm:text-xl font-semibold text-slate-900 mb-2"
        >
          What do you want to know?
        </label>

        <div className="relative mt-2">
          <textarea
            id="user-question"
            ref={textareaRef}
            rows={4}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="I want to know how much money was spent repairing the road near my school."
            className="w-full text-base sm:text-lg text-slate-800 placeholder:text-slate-400 bg-slate-50/70 hover:bg-slate-50 focus:bg-white rounded-2xl p-4 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all resize-y min-h-[120px]"
            aria-describedby="question-helper"
          />
        </div>

        <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p id="question-helper" className="text-xs sm:text-sm text-slate-500">
            You don't need to know legal language. Just explain it normally.
          </p>

          <button
            type="submit"
            disabled={!isValid || isLoading}
            className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm sm:text-base font-semibold text-white transition-all shadow-sm ${
              isValid && !isLoading
                ? 'bg-blue-600 hover:bg-blue-700 active:scale-[0.99] cursor-pointer shadow-blue-500/20'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Build my RTI</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};
