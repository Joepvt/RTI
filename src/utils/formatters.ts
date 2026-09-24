import { TimePeriodOption, DepartmentAwareness } from '../types/rti';

export function formatRelativeDate(isoDateString: string): string {
  try {
    const date = new Date(isoDateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'Saved just now';
    if (diffHours < 24) return 'Saved today';
    if (diffDays === 1) return 'Saved yesterday';
    if (diffDays < 7) return `Saved ${diffDays} days ago`;
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return 'Saved recently';
  }
}

export function formatTimePeriodLabel(type: TimePeriodOption, custom?: string): string {
  switch (type) {
    case 'last_6_months':
      return 'Last 6 months';
    case 'last_year':
      return 'Last year (past 12 months)';
    case 'specific_year':
      return custom ? `Year ${custom}` : 'Specific year';
    case 'custom':
      return custom || 'Custom period';
    case 'unknown':
    default:
      return 'Period not specified';
  }
}

export function formatDepartmentLabel(awareness: DepartmentAwareness, name?: string): string {
  if (awareness === 'known' && name) return name;
  if (awareness === 'not_sure') return 'Unsure of specific department';
  return 'Department not specified';
}
