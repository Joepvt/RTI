import React, { useState } from 'react';
import { RTIDraft, Authority } from '../../types/rti';
import { Modal } from '../common/Modal';
import { CATEGORIES_LIST, AUTHORITIES_DATA } from '../../data/authorities';
import { INDIAN_STATES } from '../../data/statesAndDistricts';
import {
  Building2,
  FileText,
  ListOrdered,
  Plus,
  Trash2,
  HelpCircle,
  Edit3,
  Calendar,
  MapPin,
  RefreshCw,
  Check
} from 'lucide-react';
import { formatTimePeriodLabel } from '../../utils/formatters';

interface EditableRTIDocumentProps {
  draft: RTIDraft;
  onUpdateDraft: (updated: RTIDraft) => void;
}

export const EditableRTIDocument: React.FC<EditableRTIDocumentProps> = ({
  draft,
  onUpdateDraft
}) => {
  const [isAuthorityModalOpen, setIsAuthorityModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Handle subject edit
  const handleSubjectChange = (val: string) => {
    onUpdateDraft({
      ...draft,
      subject: val,
      updatedAt: new Date().toISOString()
    });
  };

  // Handle point edit
  const handlePointChange = (index: number, val: string) => {
    const updatedPoints = [...draft.informationRequested];
    updatedPoints[index] = val;
    onUpdateDraft({
      ...draft,
      informationRequested: updatedPoints,
      updatedAt: new Date().toISOString()
    });
  };

  // Delete point
  const handleDeletePoint = (index: number) => {
    if (draft.informationRequested.length <= 1) return; // Keep at least one point
    const updatedPoints = draft.informationRequested.filter((_, idx) => idx !== index);
    onUpdateDraft({
      ...draft,
      informationRequested: updatedPoints,
      updatedAt: new Date().toISOString()
    });
  };

  // Add new point
  const handleAddPoint = () => {
    const updatedPoints = [
      ...draft.informationRequested,
      'Please provide certified copies of relevant registers / file notings pertaining to this matter.'
    ];
    onUpdateDraft({
      ...draft,
      informationRequested: updatedPoints,
      updatedAt: new Date().toISOString()
    });
  };

  // Switch authority
  const handleSelectAuthority = (newAuth: Authority) => {
    onUpdateDraft({
      ...draft,
      authority: newAuth,
      updatedAt: new Date().toISOString()
    });
    setIsAuthorityModalOpen(false);
  };

  const filteredAuthorities = selectedCategory === 'All'
    ? AUTHORITIES_DATA
    : AUTHORITIES_DATA.filter((a) => a.category === selectedCategory);

  const locStr = [
    draft.location.locality,
    draft.location.cityMunicipality,
    draft.location.district,
    draft.location.state
  ].filter(Boolean).join(', ') || 'Not specified';

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6">
      {/* Educational tip banner */}
      <div className="bg-blue-50/70 rounded-2xl p-4 border border-blue-100/80 flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          <span className="font-semibold text-blue-900 block mb-0.5">
            Tip: Request existing records rather than opinions
          </span>
          Public Information Officers can only provide information that already exists in files, registers, work orders, or ledgers. They cannot answer philosophical questions or fabricate new opinions.
        </div>
      </div>

      {/* 1. Authority Box (Editable) */}
      <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-100">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <Building2 className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
                Addressed To
              </span>
              <p className="font-semibold text-slate-900 text-base">
                {draft.authority.name}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Category: {draft.authority.category} &bull; {draft.authority.level} Level
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsAuthorityModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors focus:outline-none"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Change</span>
          </button>
        </div>
      </div>

      {/* 2. Context Tags (Location & Time Period - Click to Edit) */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setIsLocationModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100/90 hover:bg-slate-200/80 text-slate-700 text-xs font-medium transition-colors"
          title="Click to edit location and time period"
        >
          <MapPin className="w-3.5 h-3.5 text-slate-500" />
          <span>{locStr}</span>
          <Edit3 className="w-3 h-3 text-slate-400 ml-1" />
        </button>

        <button
          type="button"
          onClick={() => setIsLocationModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100/90 hover:bg-slate-200/80 text-slate-700 text-xs font-medium transition-colors"
          title="Click to edit location and time period"
        >
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>{formatTimePeriodLabel(draft.timePeriod.type, draft.timePeriod.customValue)}</span>
          <Edit3 className="w-3 h-3 text-slate-400 ml-1" />
        </button>
      </div>

      {/* 3. Subject (Directly Editable) */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-400" />
            <span className="text-xs uppercase font-bold tracking-wider text-slate-500">
              Subject Line
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">Click text to edit</span>
        </div>
        <textarea
          rows={2}
          value={draft.subject}
          onChange={(e) => handleSubjectChange(e.target.value)}
          className="w-full text-xs sm:text-sm font-medium text-slate-900 bg-slate-50/60 focus:bg-white rounded-2xl p-3.5 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 focus:outline-none transition-all resize-y"
          placeholder="Subject of the RTI application..."
        />
      </div>

      {/* 4. Information Requested (Item-by-item editable) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <ListOrdered className="w-4 h-4 text-slate-400" />
            <span className="text-xs uppercase font-bold tracking-wider text-slate-500">
              Information Requested (Point-Wise)
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            {draft.informationRequested.length} points
          </span>
        </div>

        <div className="space-y-3">
          {draft.informationRequested.map((point, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 p-3 rounded-2xl bg-white border border-slate-200/90 shadow-xs focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all"
            >
              <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-1">
                {idx + 1}
              </span>

              <textarea
                rows={2}
                value={point}
                onChange={(e) => handlePointChange(idx, e.target.value)}
                className="flex-1 text-xs sm:text-sm text-slate-800 bg-transparent resize-y focus:outline-none leading-relaxed"
                placeholder="Details of information or certified copy requested..."
              />

              {draft.informationRequested.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleDeletePoint(idx)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors focus:outline-none"
                  title="Remove this point"
                  aria-label={`Remove point ${idx + 1}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add point button */}
        <button
          type="button"
          onClick={handleAddPoint}
          className="mt-3.5 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-blue-600 bg-blue-50/70 hover:bg-blue-100 transition-colors focus:outline-none"
        >
          <Plus className="w-4 h-4" />
          <span>Add another point</span>
        </button>
      </div>

      {/* Change Authority Modal */}
      <Modal
        isOpen={isAuthorityModalOpen}
        onClose={() => setIsAuthorityModalOpen(false)}
        title="Select Public Authority"
        subtitle="Choose the authority that holds the relevant public records."
        maxWidth="max-w-2xl"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 -mx-1 px-1">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === 'All'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Categories
            </button>
            {CATEGORIES_LIST.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
            {filteredAuthorities.map((a) => {
              const isCurrent = a.id === draft.authority.id;
              return (
                <div
                  key={a.id}
                  onClick={() => handleSelectAuthority(a)}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                    isCurrent
                      ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-500/20'
                      : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{a.name}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{a.category} &bull; {a.level} Level</p>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{a.description}</p>
                    </div>
                    {isCurrent && (
                      <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>

      {/* Edit Location & Context Modal */}
      <Modal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        title="Edit Location & Time Period"
        subtitle="Update the geographic context and time duration for your request."
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">State / UT</label>
              <select
                value={draft.location.state}
                onChange={(e) =>
                  onUpdateDraft({
                    ...draft,
                    location: { ...draft.location, state: e.target.value },
                    updatedAt: new Date().toISOString()
                  })
                }
                className="w-full text-xs sm:text-sm bg-slate-50 rounded-xl p-2.5 border border-slate-200 focus:bg-white"
              >
                <option value="">Select State</option>
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">District</label>
              <input
                type="text"
                value={draft.location.district}
                onChange={(e) =>
                  onUpdateDraft({
                    ...draft,
                    location: { ...draft.location, district: e.target.value },
                    updatedAt: new Date().toISOString()
                  })
                }
                className="w-full text-xs sm:text-sm bg-slate-50 rounded-xl p-2.5 border border-slate-200 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">City / Municipality</label>
              <input
                type="text"
                value={draft.location.cityMunicipality}
                onChange={(e) =>
                  onUpdateDraft({
                    ...draft,
                    location: { ...draft.location, cityMunicipality: e.target.value },
                    updatedAt: new Date().toISOString()
                  })
                }
                className="w-full text-xs sm:text-sm bg-slate-50 rounded-xl p-2.5 border border-slate-200 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Locality</label>
              <input
                type="text"
                value={draft.location.locality}
                onChange={(e) =>
                  onUpdateDraft({
                    ...draft,
                    location: { ...draft.location, locality: e.target.value },
                    updatedAt: new Date().toISOString()
                  })
                }
                className="w-full text-xs sm:text-sm bg-slate-50 rounded-xl p-2.5 border border-slate-200 focus:bg-white"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">Custom Time Frame (Optional)</label>
            <input
              type="text"
              value={draft.timePeriod.customValue || ''}
              onChange={(e) =>
                onUpdateDraft({
                  ...draft,
                  timePeriod: { ...draft.timePeriod, customValue: e.target.value },
                  updatedAt: new Date().toISOString()
                })
              }
              placeholder="e.g. FY 2023-24, or past 8 months"
              className="w-full text-xs sm:text-sm bg-slate-50 rounded-xl p-2.5 border border-slate-200 focus:bg-white"
            />
          </div>

          <div className="pt-3 flex justify-end">
            <button
              type="button"
              onClick={() => setIsLocationModalOpen(false)}
              className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
