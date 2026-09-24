import React from 'react';
import { RTIDraft } from '../../types/rti';
import { EditableRTIDocument } from '../document/EditableRTIDocument';
import { LoadingState } from '../common/LoadingState';
import { SubmissionGuide } from '../export/SubmissionGuide';
import { RefreshCw, Copy, Download, Bookmark, Check } from 'lucide-react';

interface Step4ReviewProps {
  isLoading: boolean;
  draft: RTIDraft | null;
  isSaved: boolean;
  showSubmissionGuide: boolean;
  onUpdateDraft: (updated: RTIDraft) => void;
  onRegenerate: () => void;
  onCopyText: () => void;
  onOpenExport: () => void;
  onSaveToMyRequests: () => void;
  hasCopied: boolean;
}

export const Step4Review: React.FC<Step4ReviewProps> = ({
  isLoading,
  draft,
  isSaved,
  showSubmissionGuide,
  onUpdateDraft,
  onRegenerate,
  onCopyText,
  onOpenExport,
  onSaveToMyRequests,
  hasCopied
}) => {
  if (isLoading || !draft) {
    return (
      <div className="w-full max-w-xl mx-auto py-12">
        <LoadingState
          message="Preparing your RTI..."
          subMessage="Formatting point-wise record requests under Section 6(1) of the RTI Act, 2005."
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 pb-24 sm:pb-8 animate-fade-in">
      {/* Title & Introduction */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Here's your RTI
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Review and edit any points before exporting or copying.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={onRegenerate}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
              title="Regenerate draft points"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Regenerate</span>
            </button>

            <button
              type="button"
              onClick={onCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
              title="Copy text to clipboard"
            >
              {hasCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy text</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Editable RTI Document Card */}
      <EditableRTIDocument
        draft={draft}
        onUpdateDraft={onUpdateDraft}
      />

      {/* Primary Action Row (Desktop) */}
      <div className="pt-2 hidden sm:flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onSaveToMyRequests}
          disabled={isSaved}
          className={`inline-flex items-center gap-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            isSaved
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 active:scale-[0.99] cursor-pointer'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>{isSaved ? 'Saved to My Requests' : 'Save draft'}</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenExport}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.99] transition-all shadow-sm shadow-blue-500/20"
          >
            <Download className="w-4 h-4" />
            <span>Export RTI (Print / PDF)</span>
          </button>
        </div>
      </div>

      {/* Submission Guidance Section if requested or after export */}
      {showSubmissionGuide && (
        <SubmissionGuide
          authority={draft.authority}
          onSaveToMyRequests={onSaveToMyRequests}
          isSaved={isSaved}
        />
      )}

      {/* Mobile Sticky Bottom Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 z-30 flex items-center gap-2 shadow-lg no-print">
        <button
          type="button"
          onClick={onCopyText}
          className="p-3 rounded-xl border border-slate-200 bg-white text-slate-700 active:bg-slate-100"
          title="Copy text"
          aria-label="Copy text"
        >
          {hasCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
        </button>

        <button
          type="button"
          onClick={onOpenExport}
          className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Export RTI</span>
        </button>
      </div>
    </div>
  );
};
