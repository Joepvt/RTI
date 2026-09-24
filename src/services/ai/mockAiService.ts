import {
  AIService,
  GenerateDraftParams
} from './aiInterface';
import {
  ClarificationQuestion,
  Authority,
  ClarificationAnswer,
  LocationContext
} from '../../types/rti';
import { authorityService } from '../authority/authorityService';

// Small helper to simulate realistic calm processing delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class MockAIService implements AIService {
  public async generateClarifyingQuestions(question: string): Promise<ClarificationQuestion[]> {
    await delay(500);
    const qLower = question.toLowerCase();

    // Road repair / civil works
    if (qLower.includes('road') || qLower.includes('repair') || qLower.includes('pothole') || qLower.includes('street')) {
      return [
        {
          id: 'road_work_scope',
          question: 'What specific type of road repair or work was carried out?',
          type: 'select',
          options: [
            { id: 'pothole_patch', label: 'Pothole filling / Patchwork repairs' },
            { id: 'full_resurface', label: 'Complete tarring / Re-surfacing' },
            { id: 'new_construction', label: 'New road / concrete laying' },
            { id: 'not_sure', label: 'I am not sure of the exact classification' }
          ]
        },
        {
          id: 'record_focus',
          question: 'Which specific records are most important to your request?',
          type: 'select',
          options: [
            { id: 'financial_bills', label: 'Amount sanctioned, bills passed & payment vouchers' },
            { id: 'contractor_tender', label: 'Contractor details, tender notice & work order' },
            { id: 'inspection_quality', label: 'Quality test reports & defect liability / guarantee period' },
            { id: 'comprehensive', label: 'All of the above (comprehensive expenditure & execution records)' }
          ]
        },
        {
          id: 'location_landmark',
          question: 'Can you specify the landmark or exact stretch?',
          contextHint: 'E.g., "From Main Junction to Govt High School Gate"',
          type: 'text'
        }
      ];
    }

    // Education / School Funds
    if (qLower.includes('school') || qLower.includes('education') || qLower.includes('student') || qLower.includes('teacher') || qLower.includes('college')) {
      return [
        {
          id: 'school_fund_type',
          question: 'What aspect of the school funds or operations do you want details on?',
          type: 'select',
          options: [
            { id: 'infrastructure', label: 'Civil infrastructure, classroom repairs & maintenance funds' },
            { id: 'annual_grants', label: 'Annual composite school grants and utilization certificates' },
            { id: 'welfare_schemes', label: 'Mid-day meal allocation, uniforms, or textbook distribution' },
            { id: 'staffing', label: 'Sanctioned vs vacant teacher posts and staff attendance' }
          ]
        },
        {
          id: 'school_name_clarify',
          question: 'What is the full official name or registered number of the school?',
          contextHint: 'E.g., "Government Model Senior Secondary School, Ward 12"',
          type: 'text'
        }
      ];
    }

    // Streetlights / Electricity
    if (qLower.includes('streetlight') || qLower.includes('light') || qLower.includes('lamp') || qLower.includes('electricity') || qLower.includes('power')) {
      return [
        {
          id: 'lighting_scope',
          question: 'What records do you need regarding the lighting or electrical issue?',
          type: 'select',
          options: [
            { id: 'maintenance_contract', label: 'Maintenance contractor name, contract value & service terms' },
            { id: 'complaint_log', label: 'Logbook of complaints registered and resolution status' },
            { id: 'procurement', label: 'Procurement bills and warranty status of LED fittings' },
            { id: 'all_records', label: 'Complete maintenance and expenditure records' }
          ]
        },
        {
          id: 'ward_or_colony',
          question: 'Which ward number, colony, or street section is affected?',
          contextHint: 'E.g., "Ward No. 18, Block B residential lane"',
          type: 'text'
        }
      ];
    }

    // Police / Law enforcement
    if (qLower.includes('police') || qLower.includes('fir') || qLower.includes('complaint') || qLower.includes('crime')) {
      return [
        {
          id: 'police_matter_type',
          question: 'What is the status of the matter you are inquiring about?',
          type: 'select',
          options: [
            { id: 'complaint_atr', label: 'Action Taken Report (ATR) on a previously submitted complaint' },
            { id: 'daily_diary', label: 'Daily Diary / General Diary entry extract' },
            { id: 'fir_status', label: 'Status of investigation / filing of charge sheet in FIR' },
            { id: 'general_info', label: 'General police administrative information / CCTV status' }
          ]
        },
        {
          id: 'police_reference_details',
          question: 'Do you have the date of complaint, diary number, or police station name?',
          contextHint: 'E.g., "Written complaint submitted on 15-Jan at Cyber Cell"',
          type: 'text'
        }
      ];
    }

    // Water supply / drainage
    if (qLower.includes('water') || qLower.includes('drainage') || qLower.includes('sewage') || qLower.includes('pipeline')) {
      return [
        {
          id: 'water_issue_type',
          question: 'What specific information do you seek regarding water or drainage?',
          type: 'select',
          options: [
            { id: 'supply_timeline', label: 'Water supply schedule, pipeline sanction & expenditure' },
            { id: 'quality_test', label: 'Water quality testing and potability laboratory reports' },
            { id: 'drainage_desilting', label: 'Drainage cleaning/desilting contracts and payment records' },
            { id: 'new_connection', label: 'Pending applications for new water/sewage connections' }
          ]
        },
        {
          id: 'water_locality',
          question: 'Which area, sector, or pump station does this concern?',
          contextHint: 'E.g., "Sector 4 Main Distribution Line"',
          type: 'text'
        }
      ];
    }

    // General default questions
    return [
      {
        id: 'general_record_type',
        question: 'What type of government records are you primarily seeking?',
        type: 'select',
        options: [
          { id: 'financial_expenditure', label: 'Sanctioned budget, tenders, and actual expenditure' },
          { id: 'work_orders', label: 'Work orders, contractor agreements, and project deadlines' },
          { id: 'inspection_reports', label: 'Inspection registers, audit reports, and quality checks' },
          { id: 'complaint_status', label: 'Action Taken Report (ATR) on submitted applications/grievances' }
        ]
      },
      {
        id: 'specific_subject_detail',
        question: 'Is there a specific project name, scheme, or reference number you are asking about?',
        contextHint: 'E.g., "Smart City Ward 5 project" or "Leave blank if not applicable"',
        type: 'text'
      }
    ];
  }

  public async identifyAuthority(
    question: string,
    clarifications: ClarificationAnswer[],
    location?: LocationContext
  ): Promise<{
    authority: Authority;
    confidence: 'High' | 'Likely match' | 'Moderate';
    reason: string;
  }> {
    await delay(650);
    return authorityService.matchAuthority(question, clarifications, location);
  }

  public async generateRTIDraft(params: GenerateDraftParams): Promise<{
    subject: string;
    informationRequested: string[];
  }> {
    await delay(750);
    const { question, clarifications, location, timePeriod, authority } = params;
    const qLower = question.toLowerCase();

    // Format location string
    const locParts = [location.locality, location.cityMunicipality, location.district, location.state]
      .filter((p) => p && p.trim().length > 0)
      .join(', ');
    const locText = locParts ? `at/for ${locParts}` : '';

    // Format time period string
    let timeText = 'for the relevant period';
    if (timePeriod.type === 'last_6_months') timeText = 'during the last 6 months';
    else if (timePeriod.type === 'last_year') timeText = 'during the preceding financial / calendar year';
    else if (timePeriod.type === 'specific_year' && timePeriod.customValue) timeText = `for the year/period ${timePeriod.customValue}`;
    else if (timePeriod.type === 'custom' && timePeriod.customValue) timeText = `for the period ${timePeriod.customValue}`;

    // Extract clarification text if any
    const landmarkAnswer = clarifications.find((c) => c.customAnswer && c.customAnswer.trim().length > 0)?.customAnswer;
    const landmarkText = landmarkAnswer ? ` (specifically: ${landmarkAnswer})` : '';

    // 1. Road repair / infrastructure case
    if (qLower.includes('road') || qLower.includes('repair') || qLower.includes('pothole') || qLower.includes('street')) {
      const subject = `Request for information under Section 6(1) of the RTI Act, 2005 regarding road repair and maintenance expenditure ${locText}`;
      const informationRequested = [
        `Please provide certified copies of the sanction order and administrative approval for the road repair / maintenance work executed ${locText}${landmarkText} ${timeText}.`,
        `Please provide the total estimated amount sanctioned, the tender amount, and the actual total amount disbursed to date for the said work.`,
        `Please provide the name of the contractor / agency awarded the tender, along with a certified copy of the Work Order and agreement containing the terms of execution.`,
        `Please provide the scheduled commencement date, scheduled completion date, and actual completion date as recorded in the measurement book / project records.`,
        `Please provide a certified copy of the Quality Inspection Report / Material Testing Report conducted before clearing the final contractor bill.`,
        `Please provide details of the Defect Liability Period (guarantee period) applicable to this road work as per contract, and the contact designation of the executive engineer responsible for ensuring adherence.`
      ];
      return { subject, informationRequested };
    }

    // 2. School / Education
    if (qLower.includes('school') || qLower.includes('education') || qLower.includes('student') || qLower.includes('teacher')) {
      const subject = `Request for information under Section 6(1) of the RTI Act, 2005 regarding funds allocation, infrastructure, and expenditure ${locText}`;
      const informationRequested = [
        `Please provide details of all funds, grants, and budgetary allocations received for the school ${locText}${landmarkText} ${timeText}.`,
        `Please provide a certified copy of the expenditure register / cash book showing the breakdown of funds spent on civil infrastructure, maintenance, and student amenities.`,
        `Please provide details of sanctioned teaching and non-teaching posts, currently filled positions, and existing vacancies at the school.`,
        `Please provide certified copies of utilization certificates (UCs) submitted to the competent authority for funds utilized ${timeText}.`,
        `Please provide the name and designation of the inspecting official who last conducted the annual institutional inspection, along with a copy of the inspection notes.`
      ];
      return { subject, informationRequested };
    }

    // 3. Streetlights / Electrical
    if (qLower.includes('streetlight') || qLower.includes('light') || qLower.includes('electricity')) {
      const subject = `Request for information under Section 6(1) of the RTI Act, 2005 regarding streetlight maintenance and grievance redressal ${locText}`;
      const informationRequested = [
        `Please provide details of the agency/contractor currently responsible for the maintenance and repair of streetlights ${locText}${landmarkText}.`,
        `Please provide a certified copy of the agreement / work order specifying the mandatory response time and penalty clauses for non-functional streetlights.`,
        `Please provide an extract of the grievance/complaint register showing complaints received regarding faulty streetlights ${timeText}, along with their resolution dates.`,
        `Please provide details of expenditure incurred on replacement of fixtures, LED lights, and cables in the specified area ${timeText}.`
      ];
      return { subject, informationRequested };
    }

    // 4. Police / FIR
    if (qLower.includes('police') || qLower.includes('fir') || qLower.includes('complaint')) {
      const subject = `Request for information under Section 6(1) of the RTI Act, 2005 regarding Action Taken Report and status of police complaint ${locText}`;
      const informationRequested = [
        `Please provide a certified copy of the Action Taken Report (ATR) and Daily Diary / General Diary entry recorded with respect to the matter/complaint ${locText}${landmarkText}.`,
        `Please provide the name and designation of the Inquiry Officer / Investigating Officer assigned to this matter and the date on which the matter was assigned.`,
        `Please provide certified copies of file notings, statements recorded, and preliminary inquiry findings recorded to date.`,
        `If no formal action or FIR has been registered, please provide certified copies of the written grounds recorded by the competent officer for not taking action.`
      ];
      return { subject, informationRequested };
    }

    // 5. Water / Drainage
    if (qLower.includes('water') || qLower.includes('drainage') || qLower.includes('sewage')) {
      const subject = `Request for information under Section 6(1) of the RTI Act, 2005 regarding public water supply and pipeline maintenance ${locText}`;
      const informationRequested = [
        `Please provide details of the sanctioned projects and funds allocated for drinking water supply / pipeline maintenance ${locText}${landmarkText} ${timeText}.`,
        `Please provide certified copies of laboratory water potability and quality test reports conducted for the water supplied in this jurisdiction ${timeText}.`,
        `Please provide details of complaints logged regarding pipeline leakages, contaminated water, or low pressure, along with the action taken on each complaint.`,
        `Please provide the designation and official address of the junior engineer and executive engineer overseeing water distribution in this ward/zone.`
      ];
      return { subject, informationRequested };
    }

    // Generic / Fallback structured draft
    const subject = `Request for information under Section 6(1) of the RTI Act, 2005 regarding records and expenditure concerning ${question.slice(0, 80).trim()}... ${locText}`;
    const informationRequested = [
      `Please provide certified copies of all administrative approvals, sanction orders, and budgetary allocations regarding the specified matter ${locText}${landmarkText} ${timeText}.`,
      `Please provide a certified item-wise expenditure statement and details of funds disbursed to date.`,
      `Please provide details of any tenders floated, work orders issued, and the names of agencies/contractors executing the work/scheme.`,
      `Please provide certified copies of the relevant file notings and inspection reports recorded in the official registers by the competent authority.`,
      `Please provide the designation and office address of the public official(s) responsible for monitoring this activity / project under the ${authority.name}.`
    ];

    return { subject, informationRequested };
  }
}

export const mockAIService = new MockAIService();
