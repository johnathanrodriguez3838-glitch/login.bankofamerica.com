import React from 'react';
import { TransactionTable } from '../components/TransactionTable';
import { CustomerProfile } from '../data/account';
import {
  FileText,
  ShieldCheck,
  Download,
  Calendar,
  Lock,
} from 'lucide-react';

interface TransactionsPageProps {
  profile: CustomerProfile;
  onNavigateToDashboard: () => void;
}

export const TransactionsPage: React.FC<TransactionsPageProps> = ({
  profile,
  onNavigateToDashboard,
}) => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <button
              type="button"
              onClick={onNavigateToDashboard}
              className="hover:underline text-[#0052c2]"
            >
              Accounts
            </button>
            <span>/</span>
            <span className="text-slate-700 font-medium">Activity & Ledger</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Transaction History & Ledger
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Comprehensive audit record of all posted credits, debits, payments, and payroll retainers.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Real-time Ledger Synchronized</span>
          </span>
        </div>
      </div>

      {/* Main Interactive Table & Filter System */}
      <TransactionTable />
    </div>
  );
};
