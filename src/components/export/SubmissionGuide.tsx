import React from 'react';
import { Authority } from '../../types/rti';
import { ExternalLink, CheckCircle2, Bookmark, Mail, FileCheck, Info } from 'lucide-react';

interface SubmissionGuideProps {
  authority: Authority;
  onSaveToMyRequests: () => void;
  isSaved: boolean;
}

export const SubmissionGuide: React.FC<SubmissionGuideProps> = ({
  authority,
  onSaveToMyRequests,
  isSaved
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-card space-y-6 animate-fade-in no-print">
      {/* Header */}
      <div className="flex items-start gap-3.5 pb-4 border-b border-slate-100">
        <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            Your RTI is ready
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Submit this through the appropriate official RTI channel for the selected public authority.
          </p>
        </div>
      </div>

      {/* Official Submission Methods */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-blue-600" />
          <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400">
            Official Submission
          </h4>
        </div>

        {/* If verified official URL exists */}
        {authority.officialPortalUrl ? (
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-900">
                  {authority.portalName || 'Official RTI Portal'}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  Official government source
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                You can submit your drafted text online directly through this verified portal.
              </p>
            </div>

            <a
              href={authority.officialPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs"
            >
              <span>Open official website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-medium text-slate-800">
                  Verify the appropriate submission method from the relevant government authority.
                </p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Most local municipal corporations, panchayats, and state departments accept applications physically at their public counter or by post.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Physical Dispatch Advice */}
        <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-start gap-3">
          <Mail className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-slate-600 leading-relaxed">
            <span className="font-semibold text-slate-900 block mb-0.5">
              Postal Submission Instructions
            </span>
            {authority.submissionAdvice} Attach the standard statutory application fee (usually ₹10 via Indian Postal Order or Court Fee Stamp) and send via Registered Post / Speed Post with Acknowledgment Due (AD).
          </div>
        </div>
      </div>

      {/* Save Action */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-slate-500 text-center sm:text-left">
          RTI Easy never claims automated submission or generates mock tracking numbers.
        </p>

        <button
          type="button"
          onClick={onSaveToMyRequests}
          disabled={isSaved}
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            isSaved
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
              : 'bg-slate-900 hover:bg-slate-800 text-white cursor-pointer active:scale-[0.99]'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>{isSaved ? "Saved to My Requests" : "I've saved my RTI"}</span>
        </button>
      </div>
    </div>
  );
};
