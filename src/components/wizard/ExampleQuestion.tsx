import React from 'react';
import { SAMPLE_QUESTIONS } from '../../data/sampleQuestions';
import { SampleQuestion } from '../../types/rti';
import { ArrowUpRight } from 'lucide-react';

interface ExampleQuestionProps {
  onSelect: (sample: SampleQuestion) => void;
}

export const ExampleQuestion: React.FC<ExampleQuestionProps> = ({ onSelect }) => {
  return (
    <div className="w-full mt-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase font-bold tracking-wider text-slate-500">
          Try an example question
        </span>
        <span className="text-xs text-slate-500 hidden sm:inline">
          Click any to autofill
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {SAMPLE_QUESTIONS.map((sample) => (
          <button
            key={sample.id}
            type="button"
            onClick={() => onSelect(sample)}
            className="group flex items-start justify-between p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-xs transition-all text-left focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <div className="pr-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {sample.shortTitle}
                </span>
                {sample.badge && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {sample.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                "{sample.fullQuestion}"
              </p>
            </div>
            <div className="w-6 h-6 rounded-lg bg-slate-50 group-hover:bg-blue-50 text-slate-400 group-hover:text-blue-600 flex items-center justify-center flex-shrink-0 transition-colors mt-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
