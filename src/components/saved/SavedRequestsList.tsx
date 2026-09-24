import React from 'react';
import { SavedRequest } from '../../types/rti';
import { SavedRequestCard } from './SavedRequestCard';
import { EmptyState } from '../common/EmptyState';
import { Bookmark, Plus } from 'lucide-react';

interface SavedRequestsListProps {
  requests: SavedRequest[];
  onOpen: (req: SavedRequest) => void;
  onCopy: (req: SavedRequest) => void;
  onExport: (req: SavedRequest) => void;
  onDelete: (id: string) => void;
  onCreateNew: () => void;
}

export const SavedRequestsList: React.FC<SavedRequestsListProps> = ({
  requests,
  onOpen,
  onCopy,
  onExport,
  onDelete,
  onCreateNew
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            My Requests
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Locally saved RTI drafts on this browser.
          </p>
        </div>

        {requests.length > 0 && (
          <button
            type="button"
            onClick={onCreateNew}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>New Request</span>
          </button>
        )}
      </div>

      {requests.length === 0 ? (
        <EmptyState
          icon={<Bookmark className="w-7 h-7 text-slate-400" />}
          title="No saved requests yet"
          description="Draft an RTI request from the home screen and click 'Save my RTI' to access it anytime here."
          actionText="Create your first RTI"
          onAction={onCreateNew}
        />
      ) : (
        <div className="space-y-3.5">
          {requests.map((req) => (
            <SavedRequestCard
              key={req.id}
              request={req}
              onOpen={onOpen}
              onCopy={onCopy}
              onExport={onExport}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
