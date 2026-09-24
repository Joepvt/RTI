import React from 'react';
import { TopBar } from './TopBar';
import { Footer } from './Footer';
import { ProgressIndicator } from '../common/ProgressIndicator';
import { WizardStep } from '../../types/rti';

interface AppShellProps {
  children: React.ReactNode;
  currentStep: WizardStep;
  activeTab: 'home' | 'about' | 'saved';
  onTabChange: (tab: 'home' | 'about' | 'saved') => void;
  onBack?: () => void;
  onStepClick?: (step: WizardStep) => void;
  savedCount: number;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  currentStep,
  activeTab,
  onTabChange,
  onBack,
  onStepClick,
  savedCount
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-850">
      {/* Top Navigation */}
      <TopBar
        currentStep={currentStep}
        activeTab={activeTab}
        onTabChange={onTabChange}
        onBack={onBack}
        savedCount={savedCount}
      />

      {/* Wizard Progress Bar when inside wizard */}
      {activeTab === 'home' && currentStep > 0 && (
        <ProgressIndicator
          currentStep={currentStep}
          onStepClick={onStepClick}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
