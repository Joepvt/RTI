import React from 'react';
import { ClarificationQuestion, ClarificationAnswer } from '../../types/rti';
import { ClarificationCard } from './ClarificationCard';
import { ArrowRight, MessageSquareQuote } from 'lucide-react';

interface Step1ClarifyProps {
  originalQuestion: string;
  clarifications: ClarificationQuestion[];
  answers: ClarificationAnswer[];
  onAnswerChange: (ans: ClarificationAnswer) => void;
  onNext: () => void;
}

export const Step1Clarify: React.FC<Step1ClarifyProps> = ({
  originalQuestion,
  clarifications,
  answers,
  onAnswerChange,
  onNext
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 pb-20 sm:pb-8 animate-fade-in">
      {/* Title & Introduction */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Let's understand your question.
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Answer a couple of quick questions to help us request the exact records you need.
        </p>
      </div>

      {/* User's Original Question Pill */}
      <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-200/80">
        <div className="flex items-start gap-2.5">
          <MessageSquareQuote className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
              Your Question
            </span>
            <p className="text-xs sm:text-sm font-medium text-slate-800 italic leading-relaxed">
              "{originalQuestion}"
            </p>
          </div>
        </div>
      </div>

      {/* Clarification Questions List */}
      <div className="space-y-4">
        {clarifications.map((q) => {
          const currentAnswer = answers.find((a) => a.questionId === q.id);
          return (
            <ClarificationCard
              key={q.id}
              question={q}
              answer={currentAnswer}
              onChange={onAnswerChange}
            />
          );
        })}
      </div>

      {/* Primary Action Button (Desktop & Mobile sticky) */}
      <div className="pt-4 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="hidden sm:inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.99] transition-all shadow-sm shadow-blue-500/20"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 z-30 flex items-center justify-between gap-3 shadow-lg no-print">
        <span className="text-xs text-slate-500 pl-2">Step 1 of 4</span>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
