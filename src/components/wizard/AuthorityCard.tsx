import React, { useState } from 'react';
import { Authority } from '../../types/rti';
import { AuthorityReason } from './AuthorityReason';
import { Modal } from '../common/Modal';
import { CATEGORIES_LIST, AUTHORITIES_DATA } from '../../data/authorities';
import { Building, Check, ArrowRight, RefreshCw, Shield, ExternalLink } from 'lucide-react';

interface AuthorityCardProps {
  authority: Authority;
  confidence: 'High' | 'Likely match' | 'Moderate';
  reason: string;
  onConfirm: () => void;
  onSelectAuthority: (newAuthority: Authority) => void;
}

export const AuthorityCard: React.FC<AuthorityCardProps> = ({
  authority,
  confidence,
  reason,
  onConfirm,
  onSelectAuthority
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const confidenceStyles = {
    'High': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Likely match': 'bg-blue-50 text-blue-700 border-blue-200',
    'Moderate': 'bg-amber-50 text-amber-700 border-amber-200'
  };

  const filteredAuthorities = selectedCategory === 'All'
    ? AUTHORITIES_DATA
    : AUTHORITIES_DATA.filter((a) => a.category === selectedCategory);

  const handleManualPick = (a: Authority) => {
    onSelectAuthority(a);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-card animate-fade-in">
        {/* Header with Title and Confidence */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
              Public Authority Identification
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                confidenceStyles[confidence] || confidenceStyles['Likely match']
              }`}
            >
              <Shield className="w-3 h-3 inline mr-1 -mt-0.5" />
              {confidence}
            </span>
          </div>
        </div>

        {/* Authority details */}
        <div className="mt-5">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-100/60">
              <Building className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Likely Public Authority
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5 leading-snug">
                {authority.name}
              </h3>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                  {authority.category}
                </span>
                <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                  {authority.level} Level
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed">
            {authority.description}
          </p>

          {/* Neutral rationale */}
          <AuthorityReason reason={reason} />

          {/* Official submission notice if known */}
          {authority.officialPortalUrl && (
            <div className="mt-3 text-xs text-blue-700 bg-blue-50/60 p-3 rounded-xl border border-blue-100 flex items-center justify-between">
              <span>Verified Central Portal available: {authority.portalName}</span>
              <a
                href={authority.officialPortalUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 font-semibold hover:underline"
              >
                <span>Check portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/70 transition-colors focus:outline-none"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Choose another authority</span>
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm sm:text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.99] transition-all shadow-sm shadow-blue-500/20"
          >
            <span>Looks right</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Manual Authority Selection Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select Public Authority"
        subtitle="Choose the authority that most closely manages the records you need."
        maxWidth="max-w-2xl"
      >
        <div className="space-y-4">
          {/* Category Filter Pills */}
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

          {/* List of Authorities */}
          <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
            {filteredAuthorities.map((a) => {
              const isCurrent = a.id === authority.id;
              return (
                <div
                  key={a.id}
                  onClick={() => handleManualPick(a)}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                    isCurrent
                      ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-500/20'
                      : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {a.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] font-medium text-slate-500">
                          {a.category}
                        </span>
                        <span className="text-[11px] font-medium text-slate-400">&bull;</span>
                        <span className="text-[11px] font-medium text-slate-500">
                          {a.level} Level
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        {a.description}
                      </p>
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
    </>
  );
};
