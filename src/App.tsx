import { useState, useEffect } from 'react';
import { AppShell } from './components/layout/AppShell';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { SavedRequestsPage } from './pages/SavedRequestsPage';
import { Toast } from './components/common/Toast';
import { WizardStep, ToastMessage, RTIDraft, SavedRequest } from './types/rti';
import { storageService } from './services/storage/storageService';

export function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'saved'>('home');
  const [currentStep, setCurrentStep] = useState<WizardStep>(0);
  const [savedCount, setSavedCount] = useState<number>(0);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [initialDraftToLoad, setInitialDraftToLoad] = useState<RTIDraft | null>(null);

  // Update saved count on mount
  useEffect(() => {
    updateSavedCount();
  }, []);

  const updateSavedCount = () => {
    const list = storageService.getSavedRequests();
    setSavedCount(list.length);
  };

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    setToast({
      id: `toast_${Date.now()}`,
      message,
      type,
      duration: 3500
    });
  };

  // Back button navigation
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => (prev - 1) as WizardStep);
    }
  };

  const handleStepClick = (step: WizardStep) => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  // Open saved request from "My Requests"
  const handleOpenSavedRequest = (req: SavedRequest) => {
    setInitialDraftToLoad(req.draft);
    setActiveTab('home');
    setCurrentStep(4);
    showToast(`Loaded "${req.title}"`, 'info');
  };

  const handleCreateNew = () => {
    storageService.clearDraft();
    setInitialDraftToLoad(null);
    setCurrentStep(0);
    setActiveTab('home');
  };

  return (
    <AppShell
      currentStep={currentStep}
      activeTab={activeTab}
      onTabChange={(tab) => {
        setActiveTab(tab);
        updateSavedCount();
      }}
      onBack={handleBack}
      onStepClick={handleStepClick}
      savedCount={savedCount}
    >
      <Toast toast={toast} onClose={() => setToast(null)} />

      {activeTab === 'home' && (
        <HomePage
          currentStep={currentStep}
          onStepChange={setCurrentStep}
          onSavedCountChange={updateSavedCount}
          onShowToast={showToast}
          initialDraftToLoad={initialDraftToLoad}
          onClearInitialDraft={() => setInitialDraftToLoad(null)}
        />
      )}

      {activeTab === 'about' && <AboutPage />}

      {activeTab === 'saved' && (
        <SavedRequestsPage
          onOpenRequest={handleOpenSavedRequest}
          onCreateNew={handleCreateNew}
          onShowToast={showToast}
        />
      )}
    </AppShell>
  );
}

export default App;
