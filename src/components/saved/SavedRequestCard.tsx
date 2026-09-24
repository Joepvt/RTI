import React from 'react';
import { SavedRequest } from '../../types/rti';
import { formatRelativeDate } from '../../utils/formatters';
import { Building2, Copy, Trash2, ArrowUpRight, Printer } from 'lucide-react';

interface SavedRequestCardProps {
  request: SavedRequest;
  onOpen: (req: SavedRequest) => void;
  onCopy: (req: SavedRequest) => void;
  onExport: (req: SavedRequest) => void;
  onDelete: (id: string) => void;
}

export const SavedRequestCard: React.FC<SavedRequestCardProps> = ({
  request,
  onOpen,
  onCopy,
  onExport,
  onDelete
}) => {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        {/* Main Content Info */}
        <div className="flex-1 cursor-pointer" onClick={() => onOpen(request)}>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              {formatRelativeDate(request.createdAt)}
            </span>
            <span className="text-slate-300">&bull;</span>
            <span className="text-[11px] font-medium text-slate-500">
              {request.draft.informationRequested.length} items requested
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors leading-snug">
            {request.title}
          </h3>

          <div className="flex items-center gap-2 mt-2 text-xs text-slate-600">
            <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="font-medium text-slate-700">{request.authorityName}</span>
            <span className="text-slate-300">&bull;</span>
            <span className="text-slate-500">{request.authorityCategory}</span>
          </div>
        </div>

        {/* Action icons / buttons */}
        <div className="flex items-center gap-1.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <button
            type="button"
            onClick={() => onOpen(request)}
            className="p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            title="Edit / Open Request"
            aria-label="Open Request"
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onCopy(request)}
            className="p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            title="Copy Text"
            aria-label="Copy Text"
          >
            <Copy className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onExport(request)}
            className="p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            title="Print / Export"
            aria-label="Export Request"
          >
            <Printer className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onDelete(request.id)}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Delete Request"
            aria-label="Delete Request"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
