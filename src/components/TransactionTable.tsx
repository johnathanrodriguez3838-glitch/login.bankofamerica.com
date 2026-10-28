import React, { useState, useMemo } from 'react';
import { transactions as initialTransactions, Transaction } from '../data/transactions';
import { CardAccentBar } from './CardAccentBar';
import {
  Search,
  Filter,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownLeft,
  ChevronLeft,
  ChevronRight,
  Info,
  CheckCircle2,
  Clock,
  X,
  Receipt,
  FileSpreadsheet,
} from 'lucide-react';

interface TransactionTableProps {
  initialAccountFilter?: string;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({ initialAccountFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'credit' | 'debit'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [dateRangeFilter, setDateRangeFilter] = useState<'all' | 'september' | 'february'>('all');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Derive unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    initialTransactions.forEach((t) => set.add(t.category));
    return Array.from(set).sort();
  }, []);

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return initialTransactions.filter((txn) => {
      // Search merchant or description or reference
      const matchesSearch =
        txn.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase());

      // Type filter
      const matchesType = typeFilter === 'all' || txn.type === typeFilter;

      // Category filter
      const matchesCategory = categoryFilter === 'all' || txn.category === categoryFilter;

      // Date range filter: February and September only
      let matchesDate = true;
      if (dateRangeFilter === 'september') {
        matchesDate = txn.date.startsWith('2026-09');
      } else if (dateRangeFilter === 'february') {
        matchesDate = txn.date.startsWith('2026-02');
      }

      return matchesSearch && matchesType && matchesCategory && matchesDate;
    });
  }, [searchTerm, typeFilter, categoryFilter, dateRangeFilter]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage) || 1;
  const currentTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTransactions, currentPage]);

  // Statistics calculation for activity summary
  const summaryStats = useMemo(() => {
    let totalCredits = 0;
    let totalDebits = 0;
    let creditCount = 0;
    let debitCount = 0;

    filteredTransactions.forEach((t) => {
      if (t.type === 'credit') {
        totalCredits += t.amount;
        creditCount++;
      } else {
        totalDebits += t.amount;
        debitCount++;
      }
    });

    return {
      totalCredits,
      totalDebits,
      netFlow: totalCredits - totalDebits,
      count: filteredTransactions.length,
      creditCount,
      debitCount,
    };
  }, [filteredTransactions]);

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
      year: 'numeric',
    }).format(date);
  };

  // CSV Export feature
  const handleExportCSV = () => {
    const headers = ['Transaction ID', 'Date', 'Description / Merchant', 'Category', 'Type', 'Amount (USD)', 'Status', 'Account', 'Reference Number'];
    const rows = filteredTransactions.map((t) => [
      t.id,
      t.date,
      `"${t.merchant.replace(/"/g, '""')}"`,
      `"${t.category}"`,
      t.type,
      t.amount.toFixed(2),
      t.status,
      `"${t.account}"`,
      t.referenceNumber,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `bofa_transactions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Activity Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
            <ArrowDownLeft className="w-3.5 h-3.5" />
            Total Credits / Inflows
          </span>
          <div className="text-2xl font-bold text-emerald-700 mt-1 tabular-nums font-mono">
            {formatUSD(summaryStats.totalCredits)}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            {summaryStats.creditCount} deposits & consulting retainers
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-600 font-medium flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            Total Debits / Outflows
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums font-mono">
            {formatUSD(summaryStats.totalDebits)}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            {summaryStats.debitCount} purchases & payments
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Net Account Flow</span>
          <div
            className={`text-2xl font-bold mt-1 tabular-nums font-mono ${
              summaryStats.netFlow >= 0 ? 'text-emerald-700' : 'text-[#d02b33]'
            }`}
          >
            {summaryStats.netFlow >= 0 ? '+' : ''}
            {formatUSD(summaryStats.netFlow)}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Selected view range</span>
        </div>
      </div>

      {/* Main Ledger Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <CardAccentBar />

        {/* Filter Bar Controls */}
        <div className="p-5 border-b border-slate-100 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search merchant, description, or reference #..."
                className="w-full pl-9 pr-8 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#012169] focus:ring-1 focus:ring-[#012169] transition-colors"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Export CSV Button */}
            <div className="flex items-center gap-2 self-end lg:self-auto">
              <button
                type="button"
                onClick={handleExportCSV}
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <Download className="w-3.5 h-3.5 text-[#012169]" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Secondary Filter Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
            {/* Type Filter Buttons */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg">
              <button
                type="button"
                onClick={() => {
                  setTypeFilter('all');
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  typeFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Types
              </button>
              <button
                type="button"
                onClick={() => {
                  setTypeFilter('credit');
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  typeFilter === 'credit'
                    ? 'bg-white text-emerald-800 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Credits Only
              </button>
              <button
                type="button"
                onClick={() => {
                  setTypeFilter('debit');
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  typeFilter === 'debit'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Debits Only
              </button>
            </div>

            {/* Category Select */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-medium">Category:</span>
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-xs focus:outline-none focus:border-[#012169]"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range Select */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-medium">Period:</span>
              <select
                value={dateRangeFilter}
                onChange={(e) => {
                  setDateRangeFilter(e.target.value as any);
                  setCurrentPage(1);
                }}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-xs focus:outline-none focus:border-[#012169]"
              >
                <option value="all">All (Feb &amp; Sep 2026)</option>
                <option value="september">September 2026</option>
                <option value="february">February 2026</option>
              </select>
            </div>

            {(searchTerm || typeFilter !== 'all' || categoryFilter !== 'all' || dateRangeFilter !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setTypeFilter('all');
                  setCategoryFilter('all');
                  setDateRangeFilter('all');
                  setCurrentPage(1);
                }}
                className="text-[#0052c2] hover:underline font-medium text-xs ml-auto"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Desktop Table View (lg and up) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-5">Date</th>
                <th className="py-3 px-5">Description / Merchant</th>
                <th className="py-3 px-5">Category</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-right">Amount</th>
                <th className="py-3 px-4 text-center">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentTransactions.length > 0 ? (
                currentTransactions.map((txn) => {
                  const isCredit = txn.type === 'credit';
                  return (
                    <tr
                      key={txn.id}
                      onClick={() => setSelectedTransaction(txn)}
                      className="hover:bg-blue-50/30 cursor-pointer transition-colors"
                    >
                      {/* Date */}
                      <td className="py-3.5 px-5 text-xs text-slate-600 whitespace-nowrap tabular-nums">
                        {formatDate(txn.date)}
                      </td>

                      {/* Description */}
                      <td className="py-3.5 px-5">
                        <div className="font-semibold text-slate-900 line-clamp-1">
                          {txn.merchant}
                        </div>
                        <div className="text-[11px] text-slate-400 line-clamp-1">
                          {txn.description}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-5 text-xs text-slate-600 whitespace-nowrap">
                        <span className="font-medium">{txn.category}</span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-5 text-xs whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{txn.status}</span>
                        </span>
                      </td>

                      {/* Amount */}
                      <td className="py-3.5 px-5 text-right whitespace-nowrap tabular-nums font-mono">
                        <span
                          className={`font-bold text-sm ${
                            isCredit ? 'text-emerald-700' : 'text-slate-900'
                          }`}
                        >
                          {isCredit ? '+' : '-'}
                          {formatUSD(txn.amount)}
                        </span>
                      </td>

                      {/* Details icon */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          className="p-1 text-slate-400 hover:text-[#012169] rounded transition-colors"
                          title="View receipt & details"
                        >
                          <Info className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 text-sm">
                    No transactions match your current search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile List View (below md) */}
        <div className="md:hidden divide-y divide-slate-100">
          {currentTransactions.length > 0 ? (
            currentTransactions.map((txn) => {
              const isCredit = txn.type === 'credit';
              return (
                <div
                  key={txn.id}
                  onClick={() => setSelectedTransaction(txn)}
                  className="p-4 hover:bg-blue-50/40 cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 pr-2">
                      <div className="text-xs text-slate-400 font-medium">
                        {formatDate(txn.date)} · {txn.category}
                      </div>
                      <div className="font-semibold text-slate-900 text-sm leading-tight">
                        {txn.merchant}
                      </div>
                      <div className="text-xs text-slate-500 line-clamp-1">
                        {txn.account}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div
                        className={`text-base font-bold tabular-nums font-mono ${
                          isCredit ? 'text-emerald-700' : 'text-slate-900'
                        }`}
                      >
                        {isCredit ? '+' : '-'}
                        {formatUSD(txn.amount)}
                      </div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                        {txn.status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-slate-500 text-sm">
              No transactions match your filters.
            </div>
          )}
        </div>

        {/* Pagination Footer */}
        <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Showing{' '}
            <span className="font-semibold text-slate-800">
              {filteredTransactions.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
            </span>{' '}
            to{' '}
            <span className="font-semibold text-slate-800">
              {Math.min(currentPage * itemsPerPage, filteredTransactions.length)}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-slate-800">
              {filteredTransactions.length}
            </span>{' '}
            transactions
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-medium text-slate-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Transaction Detail Modal / Drawer */}
      {selectedTransaction && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-[1px]"
          onClick={() => setSelectedTransaction(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-md bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <CardAccentBar />

            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-[#012169]" />
                <h3 className="font-bold text-slate-900 text-base">Transaction Details</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTransaction(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="text-center py-2 bg-slate-50 rounded-lg">
                <span className="text-xs text-slate-400 font-medium block">Transaction Amount</span>
                <div
                  className={`text-3xl font-extrabold tabular-nums font-mono mt-1 ${
                    selectedTransaction.type === 'credit' ? 'text-emerald-700' : 'text-slate-900'
                  }`}
                >
                  {selectedTransaction.type === 'credit' ? '+' : '-'}
                  {formatUSD(selectedTransaction.amount)}
                </div>
                <span className="inline-block mt-1.5 px-2 py-0.5 text-[11px] font-semibold rounded bg-white text-slate-700 border border-slate-200">
                  {selectedTransaction.status}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400">Merchant / Entity:</span>
                  <span className="font-semibold text-slate-900 text-right">{selectedTransaction.merchant}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400">Posting Date:</span>
                  <span className="font-medium text-slate-800">{formatDate(selectedTransaction.date)}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400">Account:</span>
                  <span className="font-medium text-slate-800">{selectedTransaction.account}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400">Category:</span>
                  <span className="font-medium text-slate-800">{selectedTransaction.category}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400">Transaction ID:</span>
                  <span className="font-mono text-slate-700">{selectedTransaction.id}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400">Reference Number:</span>
                  <span className="font-mono text-slate-700">{selectedTransaction.referenceNumber}</span>
                </div>
                <div className="py-2">
                  <span className="text-slate-400 block mb-1">Description / Notes:</span>
                  <p className="text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-100">
                    {selectedTransaction.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedTransaction(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#012169] rounded-lg hover:bg-[#00174c] transition-colors"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
