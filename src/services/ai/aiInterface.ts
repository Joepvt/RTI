import {
  ClarificationAnswer,
  ClarificationQuestion,
  Authority,
  LocationContext,
  TimePeriodOption,
  DepartmentAwareness
} from '../../types/rti';

export interface GenerateDraftParams {
  question: string;
  clarifications: ClarificationAnswer[];
  location: LocationContext;
  timePeriod: {
    type: TimePeriodOption;
    customValue?: string;
  };
  department: {
    awareness: DepartmentAwareness;
    name?: string;
  };
  authority: Authority;
}

export interface AIService {
  generateClarifyingQuestions(question: string): Promise<ClarificationQuestion[]>;
  identifyAuthority(
    question: string,
    clarifications: ClarificationAnswer[],
    location?: LocationContext
  ): Promise<{
    authority: Authority;
    confidence: 'High' | 'Likely match' | 'Moderate';
    reason: string;
  }>;
  generateRTIDraft(params: GenerateDraftParams): Promise<{
    subject: string;
    informationRequested: string[];
  }>;
}
