import { Authority } from '../types/rti';

export interface AuthorityCategory {
  id: string;
  name: string;
  description: string;
  authorities: Authority[];
}

export const AUTHORITIES_DATA: Authority[] = [
  {
    id: 'local_municipal_corporation',
    name: 'Municipal Corporation / Local Urban Body',
    category: 'Municipal / Local Government',
    level: 'Local',
    description: 'Responsible for local city infrastructure, municipal road repairs, streetlights, garbage management, building permissions, and ward expenditures.',
    keywords: [
      'road', 'repair', 'pothole', 'street', 'drainage', 'gutter', 'ward', 'corporation',
      'municipality', 'garbage', 'waste', 'streetlight', 'lamp', 'park', 'encroachment',
      'building permit', 'property tax', 'local', 'city', 'school road', 'footpath', 'sewage'
    ],
    reason: 'Your question relates to local roads, ward-level maintenance, or civic infrastructure, which falls under the jurisdiction of the local urban municipality or municipal corporation.',
    confidence: 'Likely match',
    officialPortalUrl: undefined, // Local bodies usually take physical application or state RTI portal
    submissionAdvice: 'Submit in person or by registered post / speed post to the Public Information Officer (PIO) at the local Municipal Corporation or Town Municipality headquarters, along with the designated state RTI fee (usually ₹10 IPO or court fee stamp).'
  },
  {
    id: 'pwd_state_roads',
    name: 'Public Works Department (PWD) / State Highways',
    category: 'Roads / Highways',
    level: 'State',
    description: 'Responsible for state highways, major district roads (MDRs), flyovers, and public government buildings construction and maintenance.',
    keywords: [
      'highway', 'pwd', 'state highway', 'flyover', 'bridge', 'bypass', 'major road',
      'contractor', 'tender', 'asphalt', 'bitumen', 'quality test', 'toll'
    ],
    reason: 'Your question mentions major arterial roads, state highways, or public civil structures, which are typically managed by the State Public Works Department (PWD).',
    confidence: 'Likely match',
    submissionAdvice: 'Can be submitted to the Executive Engineer / PIO of the local PWD division via postal mail or through your state government RTI portal if online filing is enabled.'
  },
  {
    id: 'education_department',
    name: 'Department of School Education & Literacy',
    category: 'Education',
    level: 'State',
    description: 'Responsible for government schools, teacher appointments, student grants, mid-day meal schemes, and school infrastructure development.',
    keywords: [
      'school', 'teacher', 'education', 'classroom', 'student', 'grant', 'mid-day meal',
      'textbook', 'uniform', 'funds', 'headmaster', 'principal', 'admission', 'rte', 'desk'
    ],
    reason: 'Your question relates to school facilities, educational funds, teacher allocation, or student welfare schemes managed by the State Education Department.',
    confidence: 'Likely match',
    submissionAdvice: 'Address to the Public Information Officer at the District Educational Officer (DEO) or Block Education Officer (BEO) office.'
  },
  {
    id: 'police_department',
    name: 'State Police Department / District Superintendent Office',
    category: 'Police',
    level: 'District',
    description: 'Responsible for law and order, police station FIR registers, general diary entries, police verification status, and traffic management.',
    keywords: [
      'police', 'fir', 'complaint', 'station', 'officer', 'investigation', 'patrol',
      'cctv', 'challan', 'traffic', 'verification', 'sp office', 'dsp'
    ],
    reason: 'Your question pertains to police station actions, complaint records, traffic management, or district law enforcement administration.',
    confidence: 'Likely match',
    submissionAdvice: 'Address your RTI to the Public Information Officer at the Office of the District Superintendent of Police (SP) or the designated Sub-Divisional Police Officer.'
  },
  {
    id: 'public_health_department',
    name: 'Department of Health & Family Welfare / Chief Medical Officer',
    category: 'Public Health',
    level: 'District',
    description: 'Responsible for government civil hospitals, primary health centers (PHCs), medicine supplies, doctor attendance, and public health schemes.',
    keywords: [
      'hospital', 'phc', 'doctor', 'medicine', 'health', 'ambulance', 'treatment',
      'dispensary', 'nurse', 'medical store', 'civil surgeon', 'cmo'
    ],
    reason: 'Your question concerns government medical facilities, drug procurement, healthcare staff attendance, or public hospital infrastructure.',
    confidence: 'Likely match',
    submissionAdvice: 'File with the Public Information Officer at the Office of the Chief Medical Officer (CMO) or Civil Surgeon of your district.'
  },
  {
    id: 'water_supply_sewerage_board',
    name: 'Water Supply and Sewerage Board / Jal Board',
    category: 'Water',
    level: 'Local',
    description: 'Responsible for drinking water pipeline connections, water quality testing, tanker supply, sewage pipelines, and treatment plants.',
    keywords: [
      'water', 'pipeline', 'drinking water', 'tap', 'jal', 'borewell', 'water supply',
      'contamination', 'water bill', 'tanker', 'sewerage', 'drain'
    ],
    reason: 'Your query is regarding water distribution, pipeline leakages, water quality reports, or municipal sewerage connections.',
    confidence: 'Likely match',
    submissionAdvice: 'Submit to the PIO of the local Jal Board or Municipal Water Works Executive Engineer division.'
  },
  {
    id: 'electricity_distribution_company',
    name: 'State Electricity Distribution Company (DISCOM)',
    category: 'Electricity',
    level: 'State',
    description: 'Responsible for power supply, transformer installation/repairs, electricity meters, scheduled power outages, and tariff billing records.',
    keywords: [
      'electricity', 'power', 'transformer', 'meter', 'power cut', 'discom', 'wire',
      'voltage', 'substation', 'pole', 'electric'
    ],
    reason: 'Your question involves electrical supply, transformer repairs, power billing, or state electricity distribution infrastructure.',
    confidence: 'Likely match',
    submissionAdvice: 'Address the RTI to the Assistant Executive Engineer (AEE) / PIO at your regional DISCOM sub-divisional office.'
  },
  {
    id: 'transport_department',
    name: 'Regional Transport Office (RTO) / State Transport Authority',
    category: 'Transport',
    level: 'State',
    description: 'Responsible for driving license registers, vehicle fitness tests, commercial permits, bus routes, and public transport operations.',
    keywords: [
      'rto', 'driving license', 'vehicle', 'bus', 'permit', 'transport', 'fitness certificate',
      'registration', 'rc book', 'state transport'
    ],
    reason: 'Your question involves vehicle registration, public transit routes, licensing procedures, or Regional Transport Office operations.',
    confidence: 'Likely match',
    submissionAdvice: 'Submit directly to the Public Information Officer at your local Regional Transport Office (RTO).'
  },
  {
    id: 'revenue_department',
    name: 'Revenue Department / Tehsildar / Collectorate',
    category: 'Revenue',
    level: 'District',
    description: 'Responsible for land records, property registry entries, caste/income certificates, survey numbers, encroachments, and natural disaster relief.',
    keywords: [
      'land', 'patta', 'tehsildar', 'collector', 'revenue', 'khata', 'registry',
      'mutation', 'survey', 'encroachment', 'compensation', 'relief fund', 'caste certificate'
    ],
    reason: 'Your question involves land ownership records, revenue mutations, caste/income certificates, or district collectorate orders.',
    confidence: 'Likely match',
    submissionAdvice: 'Address the application to the PIO at the Taluk Office (Tehsildar) or the District Collectorate / District Magistrate office.'
  },
  {
    id: 'rural_development_panchayat',
    name: 'Department of Rural Development & Zilla / Gram Panchayat',
    category: 'Rural Development',
    level: 'Local',
    description: 'Responsible for village development works, MNREGA wage payments, rural roads, village sanitation, and Gram Panchayat fund allocations.',
    keywords: [
      'panchayat', 'gram sabha', 'sarpanch', 'village', 'mgnrega', 'nrega', 'rural',
      'bdo', 'block development', 'kaccha road', 'village well'
    ],
    reason: 'Your question relates to village-level spending, Gram Panchayat schemes, MGNREGA works, or rural block development projects.',
    confidence: 'Likely match',
    submissionAdvice: 'File with the Panchayat Secretary (PIO) or the Block Development Officer (BDO) of your respective block.'
  },
  {
    id: 'central_government_ministry',
    name: 'Central Government Ministry / Central Public Authority',
    category: 'Central Government',
    level: 'Central',
    description: 'Covers central public sector undertakings, national highways (NHAI), railways, national banks, passport offices, and central ministries.',
    keywords: [
      'railway', 'train', 'nhai', 'national highway', 'passport', 'post office',
      'bank', 'rbi', 'income tax', 'customs', 'central', 'union', 'epfo', 'upsc'
    ],
    reason: 'Your question concerns a Central Government subject, National Highway, Railway division, Central PSU, or National Bank.',
    confidence: 'Likely match',
    officialPortalUrl: 'https://rtionline.gov.in',
    portalName: 'RTI Online (Central Government Portal)',
    submissionAdvice: 'Can be submitted online directly via the verified Central Government portal (rtionline.gov.in) with standard ₹10 online payment, or physically by postal dispatch.'
  },
  {
    id: 'state_government_general',
    name: 'State Government General Administration / Secretariat',
    category: 'State Government',
    level: 'State',
    description: 'Responsible for state-wide policy decisions, government notifications, inter-departmental matters, and state cabinet decisions.',
    keywords: [
      'secretariat', 'chief minister', 'cabinet', 'gazette', 'policy', 'state government',
      'state assembly', 'order', 'scheme', 'notification'
    ],
    reason: 'Your question addresses a broader state-wide policy, government resolution, or executive order issued at the state administration level.',
    confidence: 'Moderate',
    submissionAdvice: 'Submit to the State Secretariat Public Information Officer or the nodal department handling the specific subject.'
  }
];

export const CATEGORIES_LIST = [
  'Municipal / Local Government',
  'Roads / Highways',
  'Education',
  'Police',
  'Revenue',
  'Transport',
  'Electricity',
  'Water',
  'Public Health',
  'Rural Development',
  'State Government',
  'Central Government'
];
