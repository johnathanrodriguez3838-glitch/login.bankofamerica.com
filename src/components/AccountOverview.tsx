import React, { useState } from 'react';
import { bankAccounts, BankAccount, CustomerProfile } from '../data/account';
import { CardAccentBar } from './CardAccentBar';
import { BofALogo } from './BofALogo';
import {
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Building,
  TrendingUp,
  DollarSign,
  FileText,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';

interface AccountOverviewProps {
  onNavigateToTransfer: () => void;
  onNavigateToTransactions: () => void;
  onSelectAccount?: (account: BankAccount) => void;
}

export const AccountOverview: React.FC<AccountOverviewProps> = ({
  onNavigateToTransfer,
  onNavigateToTransactions,
  onSelectAccount,
}) => {
  const [bankingExpanded, setBankingExpanded] = useState(true);
  const [creditExpanded, setCreditExpanded] = useState(true);
  const [investmentsExpanded, setInvestmentsExpanded] = useState(true);
  const [showFullAccountNums, setShowFullAccountNums] = useState(false);

  const checkingAccounts = bankAccounts.filter((a) => a.category === 'checking');
  const savingsAccounts = bankAccounts.filter((a) => a.category === 'savings');
  const creditAccounts = bankAccounts.filter((a) => a.category === 'credit');
  const investmentAccounts = bankAccounts.filter((a) => a.category === 'investment');

  const totalLiquidBalance = 8724000.0;

  const formatUSD = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(val);
  };

  return (
    <div className="space-y-6">
      {/* Total Balance Master Card */}
      <div className="bg-gradient-to-r from-[#012169] via-[#04287a] to-[#011c59] text-white rounded-xl p-6 sm:p-7 shadow-sm relative overflow-hidden">
        {/* Subtle geometric background watermark lines */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-end pr-6">
          <BofALogo monochrome size="lg" />
        </div>

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs tracking-wider uppercase text-blue-200">
            <span className="font-semibold flex items-center gap-1.5">
              <span>Primary Liquidity & Available Balance</span>
            </span>
            <button
              type="button"
              onClick={() => setShowFullAccountNums(!showFullAccountNums)}
              className="inline-flex items-center gap-1 text-blue-200 hover:text-white transition-colors bg-white/10 px-2.5 py-1 rounded"
            >
              {showFullAccountNums ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Mask Numbers</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Reveal Account Numbers</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight tabular-nums font-mono">
                {formatUSD(totalLiquidBalance)}
              </div>
              <p className="text-xs text-blue-200 mt-1">
                Total Available across Checking & Preferred Growth Savings
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2 mt-4 sm:mt-0">
              <button
                type="button"
                onClick={onNavigateToTransfer}
                className="px-4 py-2 bg-white text-[#012169] text-xs font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-sm flex items-center gap-1.5"
              >
                <ArrowUpRight className="w-4 h-4 text-[#d02b33]" />
                <span>Transfer Funds</span>
              </button>
              <button
                type="button"
                onClick={onNavigateToTransactions}
                className="px-4 py-2 bg-white/15 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 border border-white/20"
              >
                <FileText className="w-4 h-4 text-blue-200" />
                <span>Ledger Activity</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: BANKING ACCOUNTS (CHECKING & SAVINGS) - Matching Reference Screenshot 2 */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <CardAccentBar />

        {/* Card Header matching Screenshot 2 */}
        <div
          onClick={() => setBankingExpanded(!bankingExpanded)}
          className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50/70 transition-colors border-b border-slate-100"
        >
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Banking</h3>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              (2 Accounts)
            </span>
          </div>
          <button
            type="button"
            className="text-slate-500 p-1 hover:text-slate-800 focus:outline-none"
            aria-label={bankingExpanded ? 'Collapse banking accounts' : 'Expand banking accounts'}
          >
            {bankingExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>

        {bankingExpanded && (
          <div className="divide-y divide-slate-100">
            {/* Bank of America branding banner inside card like Screenshot 2 */}
            <div className="px-5 py-2.5 bg-slate-50/60 flex items-center justify-between text-[11px] font-bold text-slate-500 tracking-wider">
              <span>BANK OF AMERICA</span>
              <div className="flex items-center gap-1 text-[#d02b33]">
                <span className="text-[10px] text-slate-400 font-normal">Routing: 026009593</span>
              </div>
            </div>

            {/* Checking Account Row */}
            {checkingAccounts.map((account) => (
              <div
                key={account.id}
                onClick={() => {
                  onSelectAccount?.(account);
                  onNavigateToTransactions();
                }}
                className="p-5 flex items-center justify-between hover:bg-blue-50/40 cursor-pointer transition-colors group"
              >
                <div className="space-y-1 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-[#012169] transition-colors">
                      {account.name} - {showFullAccountNums ? account.accountNumberFull : account.accountNumberMasked.replace('...', '')}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
                    <span>{account.subType}</span>
                    <span>·</span>
                    <span className="text-emerald-700 font-medium">Available Balance</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right shrink-0">
                  <div>
                    <div className="text-lg sm:text-xl font-bold text-slate-900 tabular-nums font-mono">
                      {formatUSD(account.availableBalance)}
                    </div>
                    <div className="text-[11px] text-slate-400">Total: {formatUSD(account.balance)}</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#012169] group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))}

            {/* Savings Account Row */}
            {savingsAccounts.map((account) => (
              <div
                key={account.id}
                onClick={() => {
                  onSelectAccount?.(account);
                  onNavigateToTransactions();
                }}
                className="p-5 flex items-center justify-between hover:bg-blue-50/40 cursor-pointer transition-colors group"
              >
                <div className="space-y-1 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-[#012169] transition-colors">
                      {account.name} - {showFullAccountNums ? account.accountNumberFull : account.accountNumberMasked.replace('...', '')}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
                    <span>{account.subType}</span>
                    <span>·</span>
                    <span className="text-[#012169] font-semibold">{account.interestRate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right shrink-0">
                  <div>
                    <div className="text-lg sm:text-xl font-bold text-slate-900 tabular-nums font-mono">
                      {formatUSD(account.availableBalance)}
                    </div>
                    <div className="text-[11px] text-emerald-600 font-medium">Yield Active</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#012169] group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: CREDIT CARDS - Matching Reference Screenshot 2 */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <CardAccentBar />

        <div
          onClick={() => setCreditExpanded(!creditExpanded)}
          className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50/70 transition-colors border-b border-slate-100"
        >
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Credit Cards</h3>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              (1 Active Card)
            </span>
          </div>
          <button
            type="button"
            className="text-slate-500 p-1 hover:text-slate-800 focus:outline-none"
            aria-label={creditExpanded ? 'Collapse credit cards' : 'Expand credit cards'}
          >
            {creditExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>

        {creditExpanded && (
          <div className="divide-y divide-slate-100">
            <div className="px-5 py-2.5 bg-slate-50/60 flex items-center justify-between text-[11px] font-bold text-slate-500 tracking-wider">
              <span>BANK OF AMERICA</span>
              <span className="text-[10px] text-slate-400 font-normal">Preferred Rewards Tier</span>
            </div>

            {creditAccounts.map((account) => (
              <div
                key={account.id}
                onClick={onNavigateToTransactions}
                className="p-5 flex items-center justify-between hover:bg-blue-50/40 cursor-pointer transition-colors group"
              >
                <div className="space-y-1 pr-4">
                  <div className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-[#012169] transition-colors leading-snug">
                    {account.name}
                  </div>
                  <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
                    <span>{account.subType}</span>
                    <span>·</span>
                    <span>Card #{showFullAccountNums ? account.accountNumberFull : account.accountNumberMasked}</span>
                    <span>·</span>
                    <span className="text-blue-700 font-medium">48,920 Rewards Points</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right shrink-0">
                  <div>
                    <div className="text-lg sm:text-xl font-bold text-slate-900 tabular-nums font-mono">
                      {formatUSD(account.balance)}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Credit Line: {formatUSD(account.creditLimit || 100000)}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#012169] group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 3: WEALTH & INVESTMENTS (MERRILL LYNCH) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <CardAccentBar />

        <div
          onClick={() => setInvestmentsExpanded(!investmentsExpanded)}
          className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50/70 transition-colors border-b border-slate-100"
        >
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Investments & Merrill Lynch
            </h3>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              (1 Portfolio)
            </span>
          </div>
          <button
            type="button"
            className="text-slate-500 p-1 hover:text-slate-800 focus:outline-none"
            aria-label={investmentsExpanded ? 'Collapse investments' : 'Expand investments'}
          >
            {investmentsExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>

        {investmentsExpanded && (
          <div className="divide-y divide-slate-100">
            <div className="px-5 py-2.5 bg-slate-50/60 flex items-center justify-between text-[11px] font-bold text-slate-500 tracking-wider">
              <span>MERRILL LYNCH A BANK OF AMERICA COMPANY</span>
              <span className="text-[10px] text-emerald-700 font-semibold">+6.4% YTD Return</span>
            </div>

            {investmentAccounts.map((account) => (
              <div
                key={account.id}
                className="p-5 flex items-center justify-between hover:bg-blue-50/40 cursor-pointer transition-colors group"
              >
                <div className="space-y-1 pr-4">
                  <div className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-[#012169] transition-colors">
                    {account.name}
                  </div>
                  <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
                    <span>{account.subType}</span>
                    <span>·</span>
                    <span>Account #{showFullAccountNums ? account.accountNumberFull : account.accountNumberMasked}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right shrink-0">
                  <div>
                    <div className="text-lg sm:text-xl font-bold text-slate-900 tabular-nums font-mono">
                      {formatUSD(account.balance)}
                    </div>
                    <div className="text-[11px] text-emerald-600 font-medium">Equities & Treasuries</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#012169] group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
