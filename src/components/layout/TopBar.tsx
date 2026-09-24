import React from 'react';
import { ArrowLeft, BookOpen, Bookmark, Sparkles, Scale } from 'lucide-react';
import { WizardStep } from '../../types/rti';

interface TopBarProps {
  currentStep: WizardStep;
  activeTab: 'home' | 'about' | 'saved';
  onTabChange: (tab: 'home' | 'about' | 'saved') => void;
  onBack?: () => void;
  savedCount: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentStep,
  activeTab,
  onTabChange,
  onBack,
  savedCount
}) => {
  const showBack = currentStep > 0 && activeTab === 'home';

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 no-print">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Left: Brand or Back Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {showBack ? (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300"
              aria-label="Go back to previous step"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden xs:inline">Back</span>
            </button>
          ) : (
            <button
              onClick={() => onTabChange('home')}
              className="flex items-center gap-2 group text-left focus:outline-none"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-700 transition-colors">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
                  RTI Easy
                  <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60 hidden sm:inline-block">
                    Beta
                  </span>
                </span>
              </div>
            </button>
          )}
        </div>

        {/* Center / Right: Simple Navigation */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => onTabChange('home')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
              activeTab === 'home'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => onTabChange('saved')}
            className={`relative px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'saved'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
            aria-label={`Saved requests (${savedCount})`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>My Requests</span>
            {savedCount > 0 && (
              <span className="inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold rounded-full bg-blue-600 text-white">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onTabChange('about')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'about'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>About</span>
          </button>
        </nav>
      </div>

      {/* Subtle independent civic-tech banner */}
      <div className="bg-slate-50 border-t border-slate-100 py-1 px-4 text-center">
        <p className="text-[11px] text-slate-500 font-medium">
          <Sparkles className="w-3 h-3 text-amber-500 inline-block mr-1 -mt-0.5" />
          Independent civic-tech project &bull; Not affiliated with the Government of India
        </p>
      </div>
    </header>
  );
};
