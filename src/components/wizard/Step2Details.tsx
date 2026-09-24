import React from 'react';
import { LocationContext, TimePeriodOption, DepartmentAwareness } from '../../types/rti';
import { LocationForm } from './LocationForm';
import { ArrowRight } from 'lucide-react';

interface Step2DetailsProps {
  location: LocationContext;
  onLocationChange: (loc: LocationContext) => void;
  timePeriod: {
    type: TimePeriodOption;
    customValue?: string;
  };
  onTimePeriodChange: (tp: { type: TimePeriodOption; customValue?: string }) => void;
  department: {
    awareness: DepartmentAwareness;
    name?: string;
  };
  onDepartmentChange: (dept: { awareness: DepartmentAwareness; name?: string }) => void;
  onNext: () => void;
  isLoading?: boolean;
}

export const Step2Details: React.FC<Step2DetailsProps> = ({
  location,
  onLocationChange,
  timePeriod,
  onTimePeriodChange,
  department,
  onDepartmentChange,
  onNext,
  isLoading = false
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 pb-20 sm:pb-8 animate-fade-in">
      {/* Title & Introduction */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Where & when did this happen?
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          These details ensure your request lands on the correct desk.
        </p>
      </div>

      {/* Location, Time, and Department Form */}
      <LocationForm
        location={location}
        onLocationChange={onLocationChange}
        timePeriod={timePeriod}
        onTimePeriodChange={onTimePeriodChange}
        department={department}
        onDepartmentChange={onDepartmentChange}
      />

      {/* Primary Action Button (Desktop) */}
      <div className="pt-4 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          disabled={isLoading}
          className="hidden sm:inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.99] transition-all shadow-sm shadow-blue-500/20 disabled:opacity-50"
        >
          <span>Find the authority</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 z-30 flex items-center justify-between gap-3 shadow-lg no-print">
        <span className="text-xs text-slate-500 pl-2">Step 2 of 4</span>
        <button
          type="button"
          onClick={onNext}
          disabled={isLoading}
          className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          <span>Find the authority</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
