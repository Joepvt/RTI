import React from 'react';
import { ShieldCheck, Info, Scale, CheckCircle2, Lock, HelpCircle, ExternalLink } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 text-xs font-semibold mb-3">
          <Scale className="w-3.5 h-3.5 text-blue-600" />
          <span>Independent Civic-Tech Project</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Why RTI Easy?
        </h1>
        <p className="text-base text-slate-600 mt-2 leading-relaxed">
          Democratizing access to public records by translating everyday questions into legally actionable RTI applications.
        </p>
      </div>

      {/* Mandatory Civic Disclaimer Box */}
      <div className="bg-amber-50/80 rounded-3xl p-5 sm:p-6 border border-amber-200/90 shadow-xs">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900 space-y-2">
            <p className="font-bold text-sm sm:text-base">
              Important Product Positioning
            </p>
            <p className="leading-relaxed">
              <strong>RTI Easy is an independent civic-tech project and is not affiliated with the Government of India</strong> or any state government department.
            </p>
            <p className="leading-relaxed">
              RTI Easy is strictly an educational tool to help you draft your request. It does <strong>not</strong> submit RTIs automatically, does <strong>not</strong> collect government fees, and never generates fake tracking numbers or officer names. Always verify current procedures and official information with the relevant government authority.
            </p>
          </div>
        </div>
      </div>

      {/* Core Principles */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          Core Principles
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Ask for Records, Not Arguments
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Under Section 2(f) of the RTI Act, citizens can request existing documents, ledgers, contracts, and measurement sheets—not opinions or justifications.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
              <Lock className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              100% Client-Side Privacy
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Your questions, locations, and personal applicant particulars remain strictly inside your browser's local storage. We have no external backend or tracking database.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-2">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Zero Fabricated Data
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We never invent PIO names, email addresses, or fake confirmation receipts. If official info isn't confirmed, we clearly say so.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-2">
              <HelpCircle className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Consumer-Grade Simplicity
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Designed as a modern consumer experience with clean cards, calm typography, and zero bureaucratic friction.
            </p>
          </div>
        </div>
      </div>

      {/* Official RTI Resources */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
        <h3 className="text-sm font-bold text-slate-900">
          Official Government Sources
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          For central public authorities (Ministries, Railways, National Highways, PSUs, Central Universities):
        </p>
        <a
          href="https://rtionline.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
        >
          <span>Visit Central Government RTI Portal (rtionline.gov.in)</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
