import React, { useState, useEffect } from 'react';
import { SavedRequest } from '../types/rti';
import { storageService } from '../services/storage/storageService';
import { exportService } from '../services/export/exportService';
import { SavedRequestsList } from '../components/saved/SavedRequestsList';

interface SavedRequestsPageProps {
  onOpenRequest: (req: SavedRequest) => void;
  onCreateNew: () => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const SavedRequestsPage: React.FC<SavedRequestsPageProps> = ({
  onOpenRequest,
  onCreateNew,
  onShowToast
}) => {
  const [requests, setRequests] = useState<SavedRequest[]>([]);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = () => {
    const list = storageService.getSavedRequests();
    setRequests(list);
  };

  const handleCopy = async (req: SavedRequest) => {
    const text = exportService.generatePlainText(req.draft, req.applicant);
    const success = await exportService.copyToClipboard(text);
    if (success) {
      onShowToast(`Copied "${req.title}" to clipboard!`, 'success');
    } else {
      onShowToast('Could not copy to clipboard', 'error');
    }
  };

  const handleExport = (req: SavedRequest) => {
    onOpenRequest(req);
  };

  const handleDelete = (id: string) => {
    storageService.deleteRequest(id);
    loadRequests();
    onShowToast('Request removed from saved list', 'info');
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in pb-12">
      <SavedRequestsList
        requests={requests}
        onOpen={onOpenRequest}
        onCopy={handleCopy}
        onExport={handleExport}
        onDelete={handleDelete}
        onCreateNew={onCreateNew}
      />
    </div>
  );
};
