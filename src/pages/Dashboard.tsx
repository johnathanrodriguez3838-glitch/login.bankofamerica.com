import React from 'react';
import { CustomerProfile, BankAccount } from '../data/account';
import { transactions, Transaction } from '../data/transactions';
import { ProfileCard } from '../components/ProfileCard';
import { CardAccentBar } from '../components/CardAccentBar';
import {
  ArrowUpRight,
  ArrowDownLeft,
  FileText,
  DollarSign,
  ShieldAlert,
  ArrowRight,
  Clock,
  Sparkles,
  ChevronRight,
  CreditCard,
  Building,
  TrendingUp,
  Download,
  AlertTriangle,
} from 'lucide-react';

interface DashboardProps {
  profile: CustomerProfile;
  onNavigateToTransfer: () => void;
  onNavigateToTransactions: () => void;
  onNavigateToProfile: () => void;
  onNavigateToAccounts: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  profile,
  onNavigateToTransfer,
  onNavigateToTransactions,
  onNavigateToProfile,
  onNavigateToAccounts,
}) => {
  const recentTransactions = transactions.slice(0, 6);

  const formatUSD = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(val);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* Personalized Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d02b33]">
              Private Wealth Client Portal
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-semibold text-slate-500">
              Preferred Rewards Platinum Honors
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Welcome back, {profile.preferredName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Overview of your liquid capital, high-yield reserves, credit facilities, and recent activity.
          </p>
        </div>

        {/* Session Status Display */}
        <div className="self-start sm:self-center text-xs text-slate-500 bg-white px-3.5 py-1.5 rounded-lg border border-slate-200 shadow-2xs font-medium">
          Secure Online Session Active
        </div>
      </div>

      {/* Account Notice / Status Banner */}
      <div className="p-4 bg-amber-50/80 border border-amber-200/90 rounded-xl flex items-start gap-3.5 shadow-2xs">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 space-y-0.5">
          <span className="font-bold">Security Notice & Verification Requirement:</span>
          <p className="text-amber-800 leading-relaxed">
            Please be advised that certain outbound transfer services are currently subject to review status. You can initiate transfers for review in the Pay & Transfer tab.
          </p>
        </div>
      </div>

      {/* Primary 2-Column Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Financial Balances & Recent Transactions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Liquidity Overview Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <CardAccentBar />

            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Combined Available Liquidity
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#012169] mt-1 tabular-nums font-mono tracking-tight">
                    {formatUSD(profile.totalAvailableBalance)}
                  </div>
                  <span className="text-xs text-slate-500 mt-1 block">
                    Business Advantage Checking + Preferred Growth Savings
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onNavigateToTransfer}
                    className="px-4 py-2 bg-[#012169] text-white text-xs font-bold rounded-lg hover:bg-[#00174c] transition-colors shadow-2xs flex items-center gap-1.5"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#d02b33]" />
                    <span>Pay & Transfer</span>
                  </button>
                  <button
                    type="button"
                    onClick={onNavigateToAccounts}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors"
                  >
                    All Accounts
                  </button>
                </div>
              </div>

              {/* Sub-account mini summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5">
                <div
                  onClick={onNavigateToTransactions}
                  className="p-4 rounded-lg bg-slate-50 border border-slate-200/70 hover:border-slate-300 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium">Business Adv Checking - 3432</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-xl font-bold text-slate-900 mt-1 tabular-nums font-mono">
                    {formatUSD(6224000.0)}
                  </div>
                  <span className="text-[11px] text-emerald-700 font-medium">Available</span>
                </div>

                <div
                  onClick={onNavigateToTransactions}
                  className="p-4 rounded-lg bg-slate-50 border border-slate-200/70 hover:border-slate-300 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium">Business Adv Savings - 0193</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-xl font-bold text-slate-900 mt-1 tabular-nums font-mono">
                    {formatUSD(2500000.0)}
                  </div>
                  <span className="text-[11px] text-[#012169] font-medium">4.85% APY Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <CardAccentBar />

            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Recent Activity</h3>
                <p className="text-xs text-slate-500">
                  Showing latest account activity and posted transactions.
                </p>
              </div>

              <button
                type="button"
                onClick={onNavigateToTransactions}
                className="text-xs font-semibold text-[#0052c2] hover:underline flex items-center gap-1"
              >
                <span>View Full History</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {recentTransactions.map((txn) => {
                const isCredit = txn.type === 'credit';
                return (
                  <div
                    key={txn.id}
                    onClick={onNavigateToTransactions}
                    className="p-4 hover:bg-slate-50/80 cursor-pointer transition-colors flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                          isCredit ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {isCredit ? (
                          <ArrowDownLeft className="w-4 h-4" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4" />
                        )}
                      </div>

                      <div>
                        <div className="font-semibold text-slate-900 text-sm line-clamp-1">
                          {txn.merchant}
                        </div>
                        <div className="text-xs text-slate-400">
                          {formatDate(txn.date)} · {txn.category}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div
                        className={`font-bold text-sm tabular-nums font-mono ${
                          isCredit ? 'text-emerald-700' : 'text-slate-900'
                        }`}
                      >
                        {isCredit ? '+' : '-'}
                        {formatUSD(txn.amount)}
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {txn.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3.5 bg-slate-50 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={onNavigateToTransactions}
                className="text-xs font-semibold text-[#012169] hover:underline"
              >
                Browse complete transaction ledger with search & filtering →
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Customer Profile & Quick Shortcuts */}
        <div className="space-y-6">
          {/* Customer Profile Card */}
          <ProfileCard profile={profile} onNavigateToFullProfile={onNavigateToProfile} />

          {/* Quick Action Navigation Grid */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-5 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Quick Banking Services
            </h4>

            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <button
                type="button"
                onClick={onNavigateToTransfer}
                className="p-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-700 text-left border border-slate-200/60 transition-colors flex flex-col gap-1.5"
              >
                <ArrowUpRight className="w-4 h-4 text-[#012169]" />
                <span>Pay & Transfer</span>
              </button>

              <button
                type="button"
                onClick={onNavigateToTransactions}
                className="p-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-700 text-left border border-slate-200/60 transition-colors flex flex-col gap-1.5"
              >
                <FileText className="w-4 h-4 text-[#012169]" />
                <span>View Ledger</span>
              </button>

              <button
                type="button"
                onClick={onNavigateToTransfer}
                className="p-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-700 text-left border border-slate-200/60 transition-colors flex flex-col gap-1.5"
              >
                <DollarSign className="w-4 h-4 text-[#012169]" />
                <span>Domestic Wire</span>
              </button>

              <button
                type="button"
                onClick={onNavigateToProfile}
                className="p-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-700 text-left border border-slate-200/60 transition-colors flex flex-col gap-1.5"
              >
                <CreditCard className="w-4 h-4 text-[#012169]" />
                <span>Profile & Identity</span>
              </button>
            </div>
          </div>

          {/* Preferred Rewards Status Card */}
          <div className="bg-gradient-to-br from-slate-900 to-[#012169] text-white rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs text-blue-200">
              <span className="uppercase font-semibold tracking-wider">Client Tier</span>
              <span>Active</span>
            </div>
            <div>
              <h4 className="font-bold text-base tracking-tight">Preferred Rewards Platinum Honors</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Enjoy 75% rewards bonus on credit cards, waived transfer fees, and dedicated private advisory access.
              </p>
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-300">Advisor: Sarah Jennings, VP</span>
              <span className="text-blue-200 font-mono">#0412-SD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
