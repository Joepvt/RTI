import React, { useState, useEffect } from 'react';
import { RTIDraft, Applicant } from '../../types/rti';
import { Modal } from '../common/Modal';
import { exportService } from '../../services/export/exportService';
import { storageService } from '../../services/storage/storageService';
import { Printer, Copy, Check, ArrowRight, UserCheck } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  draft: RTIDraft;
  onCompleteExport: (applicant: Applicant) => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  draft,
  onCompleteExport,
  onShowToast
}) => {
  const [applicant, setApplicant] = useState<Applicant>({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: draft.location.cityMunicipality || '',
    district: draft.location.district || '',
    state: draft.location.state || '',
    pincode: '',
    email: '',
    phone: '',
    isBpl: false
  });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Load previously saved applicant if exists
    const saved = storageService.getApplicant();
    if (saved) {
      setApplicant((prev) => ({
        ...prev,
        ...saved,
        // keep current draft's city/state if applicant's is empty
        city: saved.city || draft.location.cityMunicipality || '',
        district: saved.district || draft.location.district || '',
        state: saved.state || draft.location.state || ''
      }));
    }
  }, [draft]);

  const handleChange = (field: keyof Applicant, value: string | boolean) => {
    setApplicant((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCopyText = async () => {
    const text = exportService.generatePlainText(draft, applicant);
    const success = await exportService.copyToClipboard(text);
    if (success) {
      setCopied(true);
      onShowToast('Formal RTI application copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2500);
    } else {
      onShowToast('Unable to copy to clipboard', 'error');
    }
  };

  const handlePrint = () => {
    // Save applicant to local storage for user convenience
    if (applicant.fullName) {
      storageService.saveApplicant(applicant);
    }
    exportService.triggerPrint();
  };

  const handleFinish = () => {
    if (applicant.fullName) {
      storageService.saveApplicant(applicant);
    }
    onCompleteExport(applicant);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Export RTI Application"
      subtitle="Optionally add applicant particulars for a complete formal RTI document."
      maxWidth="max-w-2xl"
    >
      <div className="space-y-5 text-left">
        {/* Applicant Details Form */}
        <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <UserCheck className="w-4 h-4 text-blue-600" />
            <h4 className="text-xs uppercase font-bold tracking-wider text-slate-700">
              Applicant Particulars (Stored only in your browser)
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={applicant.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                className="w-full text-xs sm:text-sm bg-white rounded-xl p-2.5 border border-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Postal Address Line 1 *
              </label>
              <input
                type="text"
                value={applicant.addressLine1}
                onChange={(e) => handleChange('addressLine1', e.target.value)}
                placeholder="House No, Street name, Locality"
                className="w-full text-xs sm:text-sm bg-white rounded-xl p-2.5 border border-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                City / Town
              </label>
              <input
                type="text"
                value={applicant.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className="w-full text-xs sm:text-sm bg-white rounded-xl p-2.5 border border-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                PIN Code
              </label>
              <input
                type="text"
                value={applicant.pincode}
                onChange={(e) => handleChange('pincode', e.target.value)}
                placeholder="e.g. 560001"
                maxLength={6}
                className="w-full text-xs sm:text-sm bg-white rounded-xl p-2.5 border border-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={applicant.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="citizen@example.com"
                className="w-full text-xs sm:text-sm bg-white rounded-xl p-2.5 border border-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mobile Number (Optional)
              </label>
              <input
                type="tel"
                value={applicant.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="10-digit mobile number"
                className="w-full text-xs sm:text-sm bg-white rounded-xl p-2.5 border border-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* BPL check */}
          <div className="pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600">
              <input
                type="checkbox"
                checked={applicant.isBpl || false}
                onChange={(e) => handleChange('isBpl', e.target.checked)}
                className="rounded-md border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>I hold a Below Poverty Line (BPL) card (application fee is exempt)</span>
            </label>
          </div>
        </div>

        {/* Export Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-colors shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Print or Save as PDF</span>
          </button>

          <button
            type="button"
            onClick={handleCopyText}
            className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Formal Text</span>
              </>
            )}
          </button>
        </div>

        {/* Continue to submission guidelines */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            No account required. Stored 100% locally.
          </span>

          <button
            type="button"
            onClick={handleFinish}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
          >
            <span>View Submission Guide</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Modal>
  );
};
