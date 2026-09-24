import React from 'react';
import { RTIDraft } from '../../types/rti';
import { Building2, FileText, ListOrdered, Calendar, MapPin } from 'lucide-react';
import { formatTimePeriodLabel } from '../../utils/formatters';

interface RTIDocumentProps {
  draft: RTIDraft;
}

export const RTIDocument: React.FC<RTIDocumentProps> = ({ draft }) => {
  const locStr = [
    draft.location.locality,
    draft.location.cityMunicipality,
    draft.location.district,
    draft.location.state
  ].filter(Boolean).join(', ');

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card">
      {/* Top Formal Header */}
      <div className="border-b border-slate-100 pb-5 mb-5">
        <div className="flex items-center justify-between text-xs text-slate-400 font-semibold tracking-wider uppercase mb-1">
          <span>Draft RTI Application</span>
          <span>Sec 6(1) RTI Act 2005</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Application for Information
        </h2>
      </div>

      <div className="space-y-6 text-sm text-slate-800">
        {/* 1. Public Authority Block */}
        <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-100">
          <div className="flex items-start gap-2.5">
            <Building2 className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
                To The Public Information Officer (PIO)
              </span>
              <p className="font-semibold text-slate-900 text-base">
                {draft.authority.name}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Department / Category: {draft.authority.category}
              </p>
            </div>
          </div>
        </div>

        {/* 2. Metadata / Context Badges */}
        <div className="flex flex-wrap gap-2 text-xs">
          {locStr && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100/80 text-slate-700 font-medium">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span>{locStr}</span>
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100/80 text-slate-700 font-medium">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{formatTimePeriodLabel(draft.timePeriod.type, draft.timePeriod.customValue)}</span>
          </span>
        </div>

        {/* 3. Subject */}
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <FileText className="w-4 h-4 text-slate-400" />
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
              Subject
            </span>
          </div>
          <div className="p-3.5 rounded-2xl bg-blue-50/40 border border-blue-100/80 font-medium text-slate-900 leading-relaxed text-sm sm:text-base">
            {draft.subject}
          </div>
        </div>

        {/* 4. Information Requested */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ListOrdered className="w-4 h-4 text-slate-400" />
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
              Information Requested (Point-Wise)
            </span>
          </div>

          <div className="space-y-2.5">
            {draft.informationRequested.map((point, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs"
              >
                <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
