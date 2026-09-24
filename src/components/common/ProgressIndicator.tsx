import React from 'react';
import { Check } from 'lucide-react';
import { WizardStep } from '../../types/rti';

interface ProgressIndicatorProps {
  currentStep: WizardStep;
  onStepClick?: (step: WizardStep) => void;
}

const STEPS = [
  { step: 1 as WizardStep, label: 'Clarify' },
  { step: 2 as WizardStep, label: 'Details' },
  { step: 3 as WizardStep, label: 'Authority' },
  { step: 4 as WizardStep, label: 'Draft' }
];

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  onStepClick
}) => {
  // If at step 0 (Describe on home landing), indicator can be hidden or inactive
  if (currentStep === 0) return null;

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-3 sm:py-4 no-print">
      {/* Mobile view: Concise progress bar + label */}
      <div className="block sm:hidden">
        <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-2">
          <span>Step {currentStep} of 4</span>
          <span className="text-slate-800 font-semibold">
            {STEPS[currentStep - 1]?.label}
          </span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop / Tablet view: Stepped pills */}
      <div className="hidden sm:flex items-center justify-between relative">
        {/* Connecting bar background */}
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-slate-100 -z-0" />
        
        {/* Connecting active bar */}
        <div
          className="absolute left-6 top-1/2 -translate-y-1/2 h-0.5 bg-blue-600 -z-0 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 90}%` }}
        />

        {STEPS.map((s) => {
          const isCompleted = currentStep > s.step;
          const isCurrent = currentStep === s.step;
          const canClick = isCompleted && onStepClick;

          return (
            <button
              key={s.step}
              type="button"
              disabled={!canClick}
              onClick={() => canClick && onStepClick(s.step)}
              className={`relative z-10 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isCurrent
                  ? 'bg-blue-600 text-white shadow-xs ring-4 ring-blue-50'
                  : isCompleted
                  ? 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 cursor-pointer'
                  : 'bg-white text-slate-400 border border-slate-200 cursor-default'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-semibold ${
                  isCurrent
                    ? 'bg-white text-blue-600'
                    : isCompleted
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {isCompleted ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : s.step}
              </span>
              <span>{s.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
