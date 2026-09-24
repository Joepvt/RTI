import React from 'react';
import { ClarificationQuestion, ClarificationAnswer } from '../../types/rti';
import { HelpCircle } from 'lucide-react';

interface ClarificationCardProps {
  question: ClarificationQuestion;
  answer?: ClarificationAnswer;
  onChange: (ans: ClarificationAnswer) => void;
}

export const ClarificationCard: React.FC<ClarificationCardProps> = ({
  question,
  answer,
  onChange
}) => {
  const handleSelectOption = (optId: string) => {
    onChange({
      questionId: question.id,
      questionText: question.question,
      selectedOptionId: optId,
      customAnswer: answer?.customAnswer
    });
  };

  const handleCustomTextChange = (val: string) => {
    onChange({
      questionId: question.id,
      questionText: question.question,
      selectedOptionId: answer?.selectedOptionId,
      customAnswer: val
    });
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs mb-4">
      <div className="flex items-start gap-2.5 mb-3">
        <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm sm:text-base font-semibold text-slate-800">
            {question.question}
          </h4>
          {question.contextHint && (
            <p className="text-xs text-slate-500 mt-0.5">
              {question.contextHint}
            </p>
          )}
        </div>
      </div>

      {/* Select / Multiple Choice Options */}
      {question.options && question.options.length > 0 && (
        <div className="space-y-2 mt-2">
          {question.options.map((opt) => {
            const isSelected = answer?.selectedOptionId === opt.id;
            return (
              <label
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className={`flex items-start gap-3 p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50/50 text-slate-900 font-medium ring-1 ring-blue-500/30'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  checked={isSelected}
                  onChange={() => handleSelectOption(opt.id)}
                  className="mt-0.5 h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <span>{opt.label}</span>
                  {opt.hint && <p className="text-xs text-slate-500 mt-0.5">{opt.hint}</p>}
                </div>
              </label>
            );
          })}
        </div>
      )}

      {/* Text input if question is text type */}
      {question.type === 'text' && (
        <div className="mt-2">
          <input
            type="text"
            value={answer?.customAnswer || ''}
            onChange={(e) => handleCustomTextChange(e.target.value)}
            placeholder={question.contextHint || 'Type details here... (optional)'}
            className="w-full text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-slate-50/60 rounded-xl p-3 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 focus:outline-none transition-all"
          />
        </div>
      )}
    </div>
  );
};
