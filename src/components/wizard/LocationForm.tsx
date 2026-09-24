import React from 'react';
import {
  LocationContext,
  TimePeriodOption,
  DepartmentAwareness
} from '../../types/rti';
import { INDIAN_STATES, COMMON_DISTRICTS } from '../../data/statesAndDistricts';
import { MapPin, Calendar, Building2 } from 'lucide-react';

interface LocationFormProps {
  location: LocationContext;
  onLocationChange: (loc: LocationContext) => void;
  timePeriod: {
    type: TimePeriodOption;
    customValue?: string;
  };
  onTimePeriodChange: (tp: { type: TimePeriodOption; customValue?: string }) => void;
  department: {
    awareness: DepartmentAwareness;
    name?: string;
  };
  onDepartmentChange: (dept: { awareness: DepartmentAwareness; name?: string }) => void;
}

export const LocationForm: React.FC<LocationFormProps> = ({
  location,
  onLocationChange,
  timePeriod,
  onTimePeriodChange,
  department,
  onDepartmentChange
}) => {
  const handleFieldChange = (field: keyof LocationContext, value: string) => {
    onLocationChange({
      ...location,
      [field]: value
    });
  };

  const districts = location.state && COMMON_DISTRICTS[location.state]
    ? COMMON_DISTRICTS[location.state]
    : [];

  return (
    <div className="space-y-6">
      {/* 1. Location Section */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-slate-900">
              Location details
            </h3>
            <p className="text-xs text-slate-500">
              Helps pinpoint whether this falls under a local municipality or state body.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* State */}
          <div>
            <label htmlFor="loc-state" className="block text-xs font-semibold text-slate-700 mb-1">
              State / Union Territory
            </label>
            <select
              id="loc-state"
              value={location.state}
              onChange={(e) => handleFieldChange('state', e.target.value)}
              className="w-full text-xs sm:text-sm text-slate-800 bg-slate-50/70 hover:bg-slate-50 focus:bg-white rounded-xl p-2.5 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 focus:outline-none transition-all"
            >
              <option value="">Select State</option>
              {INDIAN_STATES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <div>
            <label htmlFor="loc-district" className="block text-xs font-semibold text-slate-700 mb-1">
              District
            </label>
            {districts.length > 0 ? (
              <select
                id="loc-district"
                value={location.district}
                onChange={(e) => handleFieldChange('district', e.target.value)}
                className="w-full text-xs sm:text-sm text-slate-800 bg-slate-50/70 hover:bg-slate-50 focus:bg-white rounded-xl p-2.5 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 focus:outline-none transition-all"
              >
                <option value="">Select District</option>
                {districts.map((dst) => (
                  <option key={dst} value={dst}>
                    {dst}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id="loc-district"
                type="text"
                value={location.district}
                onChange={(e) => handleFieldChange('district', e.target.value)}
                placeholder="e.g. Pune, South Delhi, Kanpur"
                className="w-full text-xs sm:text-sm text-slate-800 bg-slate-50/70 hover:bg-slate-50 focus:bg-white rounded-xl p-2.5 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 focus:outline-none transition-all"
              />
            )}
          </div>

          {/* City / Municipality */}
          <div>
            <label htmlFor="loc-city" className="block text-xs font-semibold text-slate-700 mb-1">
              City / Municipality / Ward
            </label>
            <input
              id="loc-city"
              type="text"
              value={location.cityMunicipality}
              onChange={(e) => handleFieldChange('cityMunicipality', e.target.value)}
              placeholder="e.g. BBMP, Municipal Council, Gram Panchayat"
              className="w-full text-xs sm:text-sm text-slate-800 bg-slate-50/70 hover:bg-slate-50 focus:bg-white rounded-xl p-2.5 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 focus:outline-none transition-all"
            />
          </div>

          {/* Locality */}
          <div>
            <label htmlFor="loc-locality" className="block text-xs font-semibold text-slate-700 mb-1">
              Locality / Area / Landmark
            </label>
            <input
              id="loc-locality"
              type="text"
              value={location.locality}
              onChange={(e) => handleFieldChange('locality', e.target.value)}
              placeholder="e.g. Near St. Paul High School, Main Market"
              className="w-full text-xs sm:text-sm text-slate-800 bg-slate-50/70 hover:bg-slate-50 focus:bg-white rounded-xl p-2.5 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 focus:outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* 2. Time Period Section */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-slate-900">
              Time period
            </h3>
            <p className="text-xs text-slate-500">
              Specifying a duration helps authorities retrieve exact ledgers.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
          {[
            { id: 'last_6_months' as TimePeriodOption, label: 'Last 6 months' },
            { id: 'last_year' as TimePeriodOption, label: 'Last year' },
            { id: 'specific_year' as TimePeriodOption, label: 'Specific year' },
            { id: 'custom' as TimePeriodOption, label: 'Custom range' },
            { id: 'unknown' as TimePeriodOption, label: "I don't know" }
          ].map((tp) => {
            const isSelected = timePeriod.type === tp.id;
            return (
              <button
                key={tp.id}
                type="button"
                onClick={() => onTimePeriodChange({ type: tp.id, customValue: timePeriod.customValue })}
                className={`p-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all text-center ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold ring-1 ring-blue-500/30'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                {tp.label}
              </button>
            );
          })}
        </div>

        {(timePeriod.type === 'specific_year' || timePeriod.type === 'custom') && (
          <div className="mt-3">
            <input
              type="text"
              value={timePeriod.customValue || ''}
              onChange={(e) => onTimePeriodChange({ ...timePeriod, customValue: e.target.value })}
              placeholder={timePeriod.type === 'specific_year' ? 'e.g. 2023-2024' : 'e.g. Jan 2022 to Dec 2023'}
              className="w-full text-xs sm:text-sm text-slate-800 bg-slate-50/70 focus:bg-white rounded-xl p-2.5 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 focus:outline-none transition-all"
            />
          </div>
        )}
      </div>

      {/* 3. Department Section */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-slate-900">
              Department
            </h3>
            <p className="text-xs text-slate-500">
              Do you know which specific department handles this?
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-3">
          {[
            { id: 'known' as DepartmentAwareness, label: 'I know it' },
            { id: 'not_sure' as DepartmentAwareness, label: "I'm not sure" },
            { id: 'unknown' as DepartmentAwareness, label: "I don't know" }
          ].map((d) => {
            const isSelected = department.awareness === d.id;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => onDepartmentChange({ awareness: d.id, name: department.name })}
                className={`p-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all text-center ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold ring-1 ring-blue-500/30'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                {d.label}
              </button>
            );
          })}
        </div>

        {department.awareness === 'known' && (
          <div className="mt-3">
            <input
              type="text"
              value={department.name || ''}
              onChange={(e) => onDepartmentChange({ ...department, name: e.target.value })}
              placeholder="e.g. Roads & Engineering Wing, PWD, Health Dept"
              className="w-full text-xs sm:text-sm text-slate-800 bg-slate-50/70 focus:bg-white rounded-xl p-2.5 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 focus:outline-none transition-all"
            />
          </div>
        )}

        {department.awareness === 'unknown' && (
          <p className="text-xs text-slate-500 mt-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            No problem at all! In the next step, RTI Easy will automatically suggest the most likely public authority based on your description.
          </p>
        )}
      </div>
    </div>
  );
};
