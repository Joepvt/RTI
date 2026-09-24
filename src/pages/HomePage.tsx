import React, { useState, useEffect } from 'react';
import {
  WizardStep,
  LocationContext,
  TimePeriodOption,
  DepartmentAwareness,
  ClarificationQuestion,
  ClarificationAnswer,
  Authority,
  RTIDraft,
  SampleQuestion,
  Applicant,
  SavedRequest
} from '../types/rti';
import { aiService } from '../services/ai';
import { storageService } from '../services/storage/storageService';
import { exportService } from '../services/export/exportService';
import { Step0Describe } from '../components/wizard/Step0Describe';
import { Step1Clarify } from '../components/wizard/Step1Clarify';
import { Step2Details } from '../components/wizard/Step2Details';
import { Step3Authority } from '../components/wizard/Step3Authority';
import { Step4Review } from '../components/wizard/Step4Review';
import { ExportModal } from '../components/export/ExportModal';
import { PrintableRTI } from '../components/document/PrintableRTI';

interface HomePageProps {
  currentStep: WizardStep;
  onStepChange: (step: WizardStep) => void;
  onSavedCountChange: () => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
  initialDraftToLoad?: RTIDraft | null;
  onClearInitialDraft?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  currentStep,
  onStepChange,
  onSavedCountChange,
  onShowToast,
  initialDraftToLoad,
  onClearInitialDraft
}) => {
  // Wizard state
  const [question, setQuestion] = useState<string>('');
  const [clarifications, setClarifications] = useState<ClarificationQuestion[]>([]);
  const [answers, setAnswers] = useState<ClarificationAnswer[]>([]);
  
  const [location, setLocation] = useState<LocationContext>({
    state: '',
    district: '',
    cityMunicipality: '',
    locality: ''
  });

  const [timePeriod, setTimePeriod] = useState<{
    type: TimePeriodOption;
    customValue?: string;
  }>({
    type: 'last_year'
  });

  const [department, setDepartment] = useState<{
    awareness: DepartmentAwareness;
    name?: string;
  }>({
    awareness: 'not_sure'
  });

  const [authority, setAuthority] = useState<Authority | null>(null);
  const [confidence, setConfidence] = useState<'High' | 'Likely match' | 'Moderate'>('Likely match');
  const [authorityReason, setAuthorityReason] = useState<string>('');

  const [draft, setDraft] = useState<RTIDraft | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [showSubmissionGuide, setShowSubmissionGuide] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasCopied, setHasCopied] = useState<boolean>(false);
  const [applicant, setApplicant] = useState<Applicant | null>(null);

  // Restore draft on mount or when passed from saved requests
  useEffect(() => {
    if (initialDraftToLoad) {
      setDraft(initialDraftToLoad);
      setQuestion(initialDraftToLoad.originalQuestion);
      setLocation(initialDraftToLoad.location);
      setTimePeriod(initialDraftToLoad.timePeriod);
      setDepartment(initialDraftToLoad.department);
      setAuthority(initialDraftToLoad.authority);
      setAnswers(initialDraftToLoad.clarifications);
      onStepChange(4);
      onClearInitialDraft?.();
      return;
    }

    const savedDraft = storageService.getDraft();
    if (savedDraft && savedDraft.originalQuestion && currentStep === 0) {
      // Check if draft has enough fields to restore
      if (savedDraft.subject && savedDraft.authority) {
        setDraft(savedDraft as RTIDraft);
        setQuestion(savedDraft.originalQuestion || '');
        if (savedDraft.location) setLocation(savedDraft.location);
        if (savedDraft.timePeriod) setTimePeriod(savedDraft.timePeriod);
        if (savedDraft.department) setDepartment(savedDraft.department);
        if (savedDraft.authority) setAuthority(savedDraft.authority);
        if (savedDraft.clarifications) setAnswers(savedDraft.clarifications);
      } else if (savedDraft.originalQuestion) {
        setQuestion(savedDraft.originalQuestion);
      }
    }

    const savedApplicant = storageService.getApplicant();
    if (savedApplicant) setApplicant(savedApplicant);
  }, [initialDraftToLoad]);

  // Persist working draft to localStorage
  useEffect(() => {
    if (question.trim().length > 0) {
      storageService.saveDraft({
        originalQuestion: question,
        location,
        timePeriod,
        department,
        authority: authority || undefined,
        clarifications: answers,
        subject: draft?.subject,
        informationRequested: draft?.informationRequested
      });
    }
  }, [question, location, timePeriod, department, authority, answers, draft]);

  // 1. Submit Question (Step 0 -> Step 1)
  const handleStartClarification = async () => {
    if (question.trim().length < 8) return;
    setIsLoading(true);
    try {
      const generated = await aiService.generateClarifyingQuestions(question);
      setClarifications(generated);
      onStepChange(1);
    } catch {
      onShowToast('Could not analyze question. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Select Sample Question
  const handleSelectSample = (sample: SampleQuestion) => {
    setQuestion(sample.fullQuestion);
    if (sample.suggestedLocation) {
      setLocation((prev) => ({
        ...prev,
        ...sample.suggestedLocation
      }));
    }
  };

  // 3. Quick 1-Click Demo
  const handleRunDemo = async () => {
    const demoQuestion = 'I want to know how much money was spent repairing the road near my school last year.';
    setQuestion(demoQuestion);
    setLocation({
      state: 'Karnataka',
      district: 'Bengaluru Urban',
      cityMunicipality: 'BBMP',
      locality: 'Malleshwaram 7th Cross'
    });
    setTimePeriod({ type: 'last_year' });
    setDepartment({ awareness: 'not_sure' });
    setIsLoading(true);

    try {
      const qs = await aiService.generateClarifyingQuestions(demoQuestion);
      setClarifications(qs);
      // Auto select first sensible answer for demo speed
      if (qs.length > 0 && qs[0].options && qs[0].options[0]) {
        setAnswers([
          {
            questionId: qs[0].id,
            questionText: qs[0].question,
            selectedOptionId: qs[0].options[0].id
          }
        ]);
      }
      onStepChange(1);
      onShowToast('Demo question loaded! Follow the 4-step wizard.', 'info');
    } catch {
      onShowToast('Error loading demo', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Update Clarification Answer
  const handleAnswerChange = (ans: ClarificationAnswer) => {
    setAnswers((prev) => {
      const idx = prev.findIndex((a) => a.questionId === ans.questionId);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = ans;
        return updated;
      }
      return [...prev, ans];
    });
  };

  // 5. Clarify Next (Step 1 -> Step 2)
  const handleClarifyNext = () => {
    onStepChange(2);
  };

  // 6. Find Authority (Step 2 -> Step 3)
  const handleFindAuthority = async () => {
    setIsLoading(true);
    onStepChange(3);
    try {
      const match = await aiService.identifyAuthority(question, answers, location);
      setAuthority(match.authority);
      setConfidence(match.confidence);
      setAuthorityReason(match.reason);
    } catch {
      onShowToast('Error finding authority', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // 7. Confirm Authority (Step 3 -> Step 4)
  const handleConfirmAuthority = async () => {
    if (!authority) return;
    setIsLoading(true);
    onStepChange(4);
    try {
      const generatedDraft = await aiService.generateRTIDraft({
        question,
        clarifications: answers,
        location,
        timePeriod,
        department,
        authority
      });

      const newDraft: RTIDraft = {
        id: `draft_${Date.now()}`,
        originalQuestion: question,
        subject: generatedDraft.subject,
        authority,
        location,
        timePeriod,
        department,
        clarifications: answers,
        informationRequested: generatedDraft.informationRequested,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setDraft(newDraft);
      setIsSaved(false);
      setShowSubmissionGuide(false);
    } catch {
      onShowToast('Could not generate RTI draft', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // 8. Regenerate RTI Draft
  const handleRegenerate = async () => {
    if (!authority) return;
    setIsLoading(true);
    try {
      const generatedDraft = await aiService.generateRTIDraft({
        question,
        clarifications: answers,
        location,
        timePeriod,
        department,
        authority
      });

      if (draft) {
        setDraft({
          ...draft,
          subject: generatedDraft.subject,
          informationRequested: generatedDraft.informationRequested,
          updatedAt: new Date().toISOString()
        });
      }
      onShowToast('RTI draft points regenerated', 'success');
    } catch {
      onShowToast('Error regenerating draft', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // 9. Copy Text
  const handleCopyText = async () => {
    if (!draft) return;
    const text = exportService.generatePlainText(draft, applicant);
    const success = await exportService.copyToClipboard(text);
    if (success) {
      setHasCopied(true);
      onShowToast('RTI application copied to clipboard!', 'success');
      setTimeout(() => setHasCopied(false), 2500);
    } else {
      onShowToast('Could not copy to clipboard', 'error');
    }
  };

  // 10. Save Draft to My Requests
  const handleSaveToMyRequests = () => {
    if (!draft) return;
    const savedReq: SavedRequest = {
      id: draft.id || `saved_${Date.now()}`,
      title: draft.subject.length > 50 ? draft.subject.slice(0, 50) + '...' : draft.subject,
      originalQuestion: draft.originalQuestion,
      authorityName: draft.authority.name,
      authorityCategory: draft.authority.category,
      createdAt: draft.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      draft,
      applicant: applicant || undefined
    };

    storageService.saveRequest(savedReq);
    setIsSaved(true);
    onSavedCountChange();
    onShowToast('Saved to My Requests!', 'success');
  };

  // 11. Complete Export
  const handleCompleteExport = (app: Applicant) => {
    setApplicant(app);
    setShowSubmissionGuide(true);
    // Auto save
    if (draft && !isSaved) {
      handleSaveToMyRequests();
    }
  };

  return (
    <>
      {/* Step 0: Describe */}
      {currentStep === 0 && (
        <Step0Describe
          question={question}
          onQuestionChange={setQuestion}
          onSubmit={handleStartClarification}
          onSelectSample={handleSelectSample}
          onRunDemo={handleRunDemo}
          isLoading={isLoading}
        />
      )}

      {/* Step 1: Clarify */}
      {currentStep === 1 && (
        <Step1Clarify
          originalQuestion={question}
          clarifications={clarifications}
          answers={answers}
          onAnswerChange={handleAnswerChange}
          onNext={handleClarifyNext}
        />
      )}

      {/* Step 2: Details */}
      {currentStep === 2 && (
        <Step2Details
          location={location}
          onLocationChange={setLocation}
          timePeriod={timePeriod}
          onTimePeriodChange={setTimePeriod}
          department={department}
          onDepartmentChange={setDepartment}
          onNext={handleFindAuthority}
          isLoading={isLoading}
        />
      )}

      {/* Step 3: Find Authority */}
      {currentStep === 3 && (
        <Step3Authority
          isLoading={isLoading}
          authority={authority}
          confidence={confidence}
          reason={authorityReason}
          onConfirm={handleConfirmAuthority}
          onSelectAuthority={(newAuth) => {
            setAuthority(newAuth);
            setAuthorityReason(newAuth.reason);
            setConfidence('Likely match');
          }}
        />
      )}

      {/* Step 4: Review RTI */}
      {currentStep === 4 && (
        <Step4Review
          isLoading={isLoading}
          draft={draft}
          isSaved={isSaved}
          showSubmissionGuide={showSubmissionGuide}
          onUpdateDraft={(updated) => {
            setDraft(updated);
            setIsSaved(false);
          }}
          onRegenerate={handleRegenerate}
          onCopyText={handleCopyText}
          onOpenExport={() => setIsExportModalOpen(true)}
          onSaveToMyRequests={handleSaveToMyRequests}
          hasCopied={hasCopied}
        />
      )}

      {/* Export Modal */}
      {draft && (
        <ExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          draft={draft}
          onCompleteExport={handleCompleteExport}
          onShowToast={onShowToast}
        />
      )}

      {/* Printable Sheet (Hidden until print triggered) */}
      {draft && (
        <PrintableRTI
          draft={draft}
          applicant={applicant}
        />
      )}
    </>
  );
};
