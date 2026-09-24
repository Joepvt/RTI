import { RTIDraft, SavedRequest, Applicant } from '../../types/rti';

const STORAGE_KEYS = {
  ACTIVE_DRAFT: 'rti_easy_active_draft_v1',
  SAVED_REQUESTS: 'rti_easy_saved_requests_v1',
  APPLICANT_PROFILE: 'rti_easy_applicant_profile_v1'
};

export class StorageService {
  // --- Active Draft ---
  public getDraft(): Partial<RTIDraft> | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIVE_DRAFT);
      if (!data) return null;
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  public saveDraft(draft: Partial<RTIDraft>): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_DRAFT, JSON.stringify(draft));
    } catch {
      // Storage quota or privacy mode error handling
    }
  }

  public clearDraft(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_DRAFT);
    } catch {
      // Ignore
    }
  }

  // --- Saved Requests ---
  public getSavedRequests(): SavedRequest[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.SAVED_REQUESTS);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  public saveRequest(request: SavedRequest): void {
    try {
      const existing = this.getSavedRequests();
      const index = existing.findIndex((r) => r.id === request.id);
      let updated: SavedRequest[];
      if (index >= 0) {
        updated = [...existing];
        updated[index] = request;
      } else {
        updated = [request, ...existing];
      }
      localStorage.setItem(STORAGE_KEYS.SAVED_REQUESTS, JSON.stringify(updated));
    } catch {
      // Handle storage exception safely
    }
  }

  public deleteRequest(id: string): void {
    try {
      const existing = this.getSavedRequests();
      const filtered = existing.filter((r) => r.id !== id);
      localStorage.setItem(STORAGE_KEYS.SAVED_REQUESTS, JSON.stringify(filtered));
    } catch {
      // Handle storage exception safely
    }
  }

  public getRequestById(id: string): SavedRequest | undefined {
    return this.getSavedRequests().find((r) => r.id === id);
  }

  // --- Applicant Information ---
  public getApplicant(): Applicant | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.APPLICANT_PROFILE);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  public saveApplicant(applicant: Applicant): void {
    try {
      localStorage.setItem(STORAGE_KEYS.APPLICANT_PROFILE, JSON.stringify(applicant));
    } catch {
      // Handle storage exception safely
    }
  }
}

export const storageService = new StorageService();
