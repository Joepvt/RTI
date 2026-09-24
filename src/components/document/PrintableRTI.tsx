import React from 'react';
import { RTIDraft, Applicant } from '../../types/rti';

interface PrintableRTIProps {
  draft: RTIDraft;
  applicant?: Applicant | null;
}

export const PrintableRTI: React.FC<PrintableRTIProps> = ({ draft, applicant }) => {
  const today = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const locStr = [
    draft.location.cityMunicipality,
    draft.location.district,
    draft.location.state
  ].filter(Boolean).join(', ') || 'Concerned Administrative Division';

  return (
    <div className="printable-document-container print-only bg-white text-black p-8 font-serif leading-relaxed text-sm max-w-3xl mx-auto">
      <div className="text-center font-bold text-base border-b-2 border-black pb-3 mb-6">
        <h1 className="text-lg uppercase tracking-wide">
          Application Under Section 6(1) of the Right to Information Act, 2005
        </h1>
        <p className="text-xs font-normal mt-1 italic text-gray-700">
          (For seeking information from Public Authorities)
        </p>
      </div>

      <div className="flex justify-between items-start text-xs mb-6">
        <div>
          <p className="font-semibold">Application Reference: Self-Prepared</p>
        </div>
        <div>
          <p className="font-semibold">Date: {today}</p>
        </div>
      </div>

      {/* Recipient */}
      <div className="mb-6">
        <p className="font-bold">To,</p>
        <p>The Public Information Officer (PIO) / Assistant PIO,</p>
        <p className="font-semibold">{draft.authority.name}</p>
        <p>Department / Jurisdiction: {draft.authority.category}</p>
        <p>Location: {locStr}</p>
      </div>

      {/* Applicant */}
      <div className="mb-6 bg-gray-50 p-3 border border-gray-200 text-xs">
        <p className="font-bold uppercase tracking-wider text-[11px] mb-1">
          1. Particulars of the Applicant:
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p><span className="font-semibold">Name:</span> {applicant?.fullName || '____________________________________'}</p>
            <p><span className="font-semibold">Address:</span> {applicant?.addressLine1 || '____________________________________'}</p>
            {applicant?.addressLine2 && <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{applicant.addressLine2}</p>}
          </div>
          <div>
            <p><span className="font-semibold">City/District:</span> {applicant?.city ? `${applicant.city}, ` : ''}{applicant?.district || '________________'}</p>
            <p><span className="font-semibold">State & PIN:</span> {applicant?.state || '________________'} {applicant?.pincode ? `- ${applicant.pincode}` : ''}</p>
            <p><span className="font-semibold">Phone / Email:</span> {applicant?.phone || applicant?.email || '________________'}</p>
          </div>
        </div>
      </div>

      {/* Subject */}
      <div className="mb-6">
        <p className="font-bold">
          Subject: <span className="font-normal underline">{draft.subject}</span>
        </p>
      </div>

      {/* Salutation & Body */}
      <div className="mb-6 space-y-4">
        <p>Respected Sir / Madam,</p>
        <p>
          I am a citizen of India. Under the provisions of Section 6(1) of the Right to Information Act, 2005,
          I kindly request you to furnish certified copies and information regarding the particulars specified below:
        </p>

        {/* Information points */}
        <div className="pl-4 space-y-2.5">
          <p className="font-bold text-xs uppercase tracking-wider">
            2. Particulars of Information Sought:
          </p>
          {draft.informationRequested.map((point, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="font-bold flex-shrink-0">{index + 1}.</span>
              <p>{point}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Declarations */}
      <div className="mb-8 text-xs space-y-2 border-t border-gray-300 pt-4">
        <p className="font-bold uppercase tracking-wider">3. Declarations:</p>
        <p>
          (i) The information sought by me does not fall under the exemptions specified under Section 8 and 9 of the RTI Act, 2005, and to the best of my knowledge pertains to your office.
        </p>
        <p>
          (ii) I state that I am an Indian Citizen and am willing to pay any additional prescribed photocopy / inspection fees in accordance with the RTI (Regulation of Fee and Cost) Rules upon notice.
        </p>
        <p>
          (iii) {applicant?.isBpl
            ? 'I am a Below Poverty Line (BPL) citizen and attach proof of same. Hence, fee is exempt.'
            : 'The requisite application fee of ₹10/- is enclosed herewith via Postal Order / Court Fee Stamp / Demand Draft / Online Payment.'}
        </p>
      </div>

      {/* Signature */}
      <div className="flex justify-between items-end pt-8">
        <div>
          <p>Place: {applicant?.city || draft.location.cityMunicipality || '________________'}</p>
          <p>Date: {today}</p>
        </div>
        <div className="text-right">
          <div className="h-10"></div>
          <p className="border-t border-black pt-1 font-semibold">
            Signature of the Applicant
          </p>
          <p className="text-xs">({applicant?.fullName || 'Applicant Name'})</p>
        </div>
      </div>
    </div>
  );
};
