export type WizardStep = 0 | 1 | 2 | 3 | 4;

export type TimePeriodOption = 
  | 'last_6_months'
  | 'last_year'
  | 'specific_year'
  | 'custom'
  | 'unknown';

export type DepartmentAwareness = 
  | 'known'
  | 'not_sure'
  | 'unknown';

export interface LocationContext {
  state: string;
  district: string;
  cityMunicipality: string;
  locality: string;
}

export interface ClarificationOption {
  id: string;
  label: string;
  hint?: string;
}

export interface ClarificationQuestion {
  id: string;
  question: string;
  contextHint?: string;
  type: 'select' | 'text' | 'choice';
  options?: ClarificationOption[];
}

export interface ClarificationAnswer {
  questionId: string;
  questionText: string;
  selectedOptionId?: string;
  customAnswer?: string;
}

export interface Authority {
  id: string;
  name: string;
  category: string;
  level: 'Local' | 'District' | 'State' | 'Central';
  description: string;
  keywords: string[];
  reason: string;
  confidence: 'High' | 'Likely match' | 'Moderate';
  officialPortalUrl?: string; // Verified only e.g. rtionline.gov.in
  portalName?: string;
  submissionAdvice: string;
}

export interface RTIDraft {
  id: string;
  originalQuestion: string;
  subject: string;
  authority: Authority;
  location: LocationContext;
  timePeriod: {
    type: TimePeriodOption;
    customValue?: string;
  };
  department: {
    awareness: DepartmentAwareness;
    name?: string;
  };
  clarifications: ClarificationAnswer[];
  informationRequested: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Applicant {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  email?: string;
  phone?: string;
  isBpl?: boolean;
}

export interface SavedRequest {
  id: string;
  title: string;
  originalQuestion: string;
  authorityName: string;
  authorityCategory: string;
  createdAt: string;
  updatedAt: string;
  draft: RTIDraft;
  applicant?: Applicant;
}

export interface SampleQuestion {
  id: string;
  shortTitle: string;
  category: string;
  fullQuestion: string;
  suggestedLocation?: Partial<LocationContext>;
  badge?: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  duration?: number;
}
