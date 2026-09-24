import { RTIDraft, Applicant } from '../../types/rti';

export class ExportService {
  /**
   * Generates a formal, standard text representation of the RTI application.
   */
  public generatePlainText(draft: RTIDraft, applicant?: Applicant | null): string {
    const today = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const applicantBlock = applicant && applicant.fullName
      ? `From:
${applicant.fullName}
${applicant.addressLine1}${applicant.addressLine2 ? ', ' + applicant.addressLine2 : ''}
${applicant.city ? applicant.city + ', ' : ''}${applicant.district ? applicant.district + ', ' : ''}${applicant.state} - ${applicant.pincode || ''}
${applicant.email ? 'Email: ' + applicant.email : ''}
${applicant.phone ? 'Phone: ' + applicant.phone : ''}`
      : `From:
[Applicant Name]
[Applicant Address]
[Contact Number / Email]`;

    const points = draft.informationRequested
      .map((item, idx) => `${idx + 1}. ${item}`)
      .join('\n\n');

    return `APPLICATION UNDER SECTION 6(1) OF THE RIGHT TO INFORMATION ACT, 2005

Date: ${today}

To:
The Central / State Public Information Officer (CPIO / SPIO),
${draft.authority.name}
Department / Jurisdiction: ${draft.authority.category}
Location: ${[draft.location.cityMunicipality, draft.location.district, draft.location.state].filter(Boolean).join(', ') || 'Concerned Administrative Division'}

${applicantBlock}

Subject: ${draft.subject}

Sir / Madam,

I am a citizen of India and hereby request you to provide the following information under Section 6(1) of the Right to Information Act, 2005:

PARTICULARS OF INFORMATION SOUGHT:

${points}

ADDITIONAL DECLARATIONS:
1. I state that the information sought does not fall within the exemptions contained in Section 8 or 9 of the RTI Act, 2005, and to the best of my knowledge, it pertains to your esteemed office.
2. I am ready and willing to pay any additional prescribed fee for photocopying / inspection of records as per rules upon notification.
3. ${applicant?.isBpl ? 'I am a Below Poverty Line (BPL) cardholder and attach proof; hence no application fee is payable.' : 'Prescribed RTI application fee is being submitted herewith.'}

Yours faithfully,

(Signature)
${applicant?.fullName || '[Applicant Name]'}`;
  }

  /**
   * Copies formatted text to the user's clipboard.
   */
  public async copyToClipboard(text: string): Promise<boolean> {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        textArea.remove();
        return successful;
      }
    } catch {
      return false;
    }
  }

  /**
   * Triggers native print dialog for the formatted document.
   */
  public triggerPrint(): void {
    window.print();
  }
}

export const exportService = new ExportService();
