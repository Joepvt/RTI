import { SampleQuestion } from '../types/rti';

export const SAMPLE_QUESTIONS: SampleQuestion[] = [
  {
    id: 'road_repair_spending',
    shortTitle: 'Road repair spending',
    category: 'Municipal / Local Government',
    fullQuestion: 'I want to know how much money was spent repairing the road near my school last year.',
    suggestedLocation: {
      state: 'Karnataka',
      district: 'Bengaluru Urban',
      cityMunicipality: 'BBMP',
      locality: 'Malleshwaram 7th Cross'
    },
    badge: 'Popular Demo'
  },
  {
    id: 'school_funds',
    shortTitle: 'Government school funds',
    category: 'Education',
    fullQuestion: 'I want to know the annual budget, grants received, and expenditure on infrastructure for the Government Boys High School in my area.',
    suggestedLocation: {
      state: 'Maharashtra',
      district: 'Pune',
      cityMunicipality: 'Pune Municipal Corporation',
      locality: 'Shivajinagar'
    }
  },
  {
    id: 'streetlight_maintenance',
    shortTitle: 'Streetlight maintenance',
    category: 'Municipal / Local Government',
    fullQuestion: 'I want to know the status of pending streetlight repair complaints and contractor details in Ward 14.',
    suggestedLocation: {
      state: 'Delhi',
      district: 'South Delhi',
      cityMunicipality: 'MCD',
      locality: 'Lajpat Nagar'
    }
  },
  {
    id: 'public_project_records',
    shortTitle: 'Public project records',
    category: 'Roads / Highways',
    fullQuestion: 'I want to know the sanctioned budget, approved contractor, and deadline for the community hall construction in my locality.',
    suggestedLocation: {
      state: 'Tamil Nadu',
      district: 'Chennai',
      cityMunicipality: 'Greater Chennai Corporation',
      locality: 'Adyar'
    }
  }
];
