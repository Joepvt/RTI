import React from 'react';
import { QuestionInput } from './QuestionInput';
import { ExampleQuestion } from './ExampleQuestion';
import { SampleQuestion } from '../../types/rti';
import { ShieldCheck, Sparkles, Zap } from 'lucide-react';

interface Step0DescribeProps {
  question: string;
  onQuestionChange: (val: string) => void;
  onSubmit: () => void;
  onSelectSample: (sample: SampleQuestion) => void;
  onRunDemo: () => void;
  isLoading?: boolean;
}

export const Step0Describe: React.FC<Step0DescribeProps> = ({
  question,
  onQuestionChange,
  onSubmit,
  onSelectSample,
  onRunDemo,
  isLoading = false
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center animate-fade-in">
      {/* Hero Header */}
      <div className="text-center mb-8 sm:mb-10 px-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Simple, plain-language RTI preparation</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Ask your government.{' '}
          <span className="text-blue-600">Without the jargon.</span>
        </h1>

        <p className="mt-3.5 text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
          Tell us what you want to know. We'll help you turn your question into a clear, legally structured RTI request.
        </p>

        {/* Quick Demo Button */}
        <div className="mt-4">
          <button
            type="button"
            onClick={onRunDemo}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 shadow-xs transition-all"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Try 1-Click Road Repair Demo</span>
          </button>
        </div>
      </div>

      {/* Main Question Card */}
      <QuestionInput
        value={question}
        onChange={onQuestionChange}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />

      {/* Clickable Examples */}
      <ExampleQuestion onSelect={onSelectSample} />

      {/* Bottom Trust & Educational Badges */}
      <div className="w-full mt-12 pt-6 border-t border-slate-200/70 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="p-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Zero Bureaucracy
          </h4>
          <p className="text-xs text-slate-500">
            No legal degree needed. We translate everyday questions into exact record requests.
          </p>
        </div>
        <div className="p-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Likely Authority Match
          </h4>
          <p className="text-xs text-slate-500">
            Intelligently pairs your issue with municipal, state, or central public bodies.
          </p>
        </div>
        <div className="p-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            100% Private & Free
          </h4>
          <p className="text-xs text-slate-500">
            All drafts stay in your browser. No account required.
          </p>
        </div>
      </div>

      {/* Independent civic-tech label */}
      <div className="mt-8 text-center">
        <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Independent civic-tech project</span>
        </span>
      </div>
    </div>
  );
};
