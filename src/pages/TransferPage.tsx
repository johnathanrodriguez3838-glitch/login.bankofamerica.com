import React, { useState } from 'react';
import { bankAccounts } from '../data/account';
import { CardAccentBar } from '../components/CardAccentBar';
import {
  ArrowRight,
  AlertCircle,
  Lock,
} from 'lucide-react';

interface TransferPageProps {
  onTriggerRestrictionModal: () => void;
  onNavigateToDashboard: () => void;
}

export const TransferPage: React.FC<TransferPageProps> = ({
  onTriggerRestrictionModal,
  onNavigateToDashboard,
}) => {
  // Transfer types: ACH and Transfer
  const [transferType, setTransferType] = useState<'ach' | 'transfer'>('ach');
  const [sourceAccountId, setSourceAccountId] = useState('checking-3432');
  
  // Exactly requested fields: account number, account name, bank name, transfer amount, reference
  const [accountName, setAccountName] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [reference, setReference] = useState('');
  
  const [step, setStep] = useState<'form' | 'review'>('form');
  const [errorMsg, setErrorMsg] = useState('');

  const sourceAccount = bankAccounts.find((a) => a.id === sourceAccountId) || bankAccounts[0];

  const formatUSD = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(val);
  };

  const numericAmount = parseFloat(amount.replace(/[^0-9.]/g, '')) || 0;

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || numericAmount <= 0) {
      setErrorMsg('Please enter a valid transfer amount greater than $0.00.');
      return;
    }
    if (numericAmount > sourceAccount.availableBalance) {
      setErrorMsg('Transfer amount exceeds available account balance.');
      return;
    }
    if (!accountName.trim()) {
      setErrorMsg('Please enter the Account Name.');
      return;
    }
    if (!bankName.trim()) {
      setErrorMsg('Please enter the Bank Name.');
      return;
    }
    if (!accountNumber.trim()) {
      setErrorMsg('Please enter the Account Number.');
      return;
    }

    setErrorMsg('');
    setStep('review');
  };

  const handleFinalSubmit = () => {
    // Triggers the account restriction modal as required
    onTriggerRestrictionModal();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Page Title & Breadcrumb */}
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
          <span className="text-slate-700 font-medium">Pay & Transfer</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Transfer & Payments
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Move funds securely via electronic ACH or account transfers.
        </p>
      </div>

      {/* Main Transfer Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <CardAccentBar />

        {/* Transfer Method Tabs: ACH and Transfer */}
        <div className="border-b border-slate-200 bg-slate-50/70 p-2 sm:p-3">
          <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
            <button
              type="button"
              onClick={() => {
                setTransferType('ach');
                setStep('form');
                setErrorMsg('');
              }}
              className={`py-2.5 px-4 text-xs font-bold rounded-lg transition-all text-center ${
                transferType === 'ach'
                  ? 'bg-white text-[#012169] shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              ACH
            </button>
            <button
              type="button"
              onClick={() => {
                setTransferType('transfer');
                setStep('form');
                setErrorMsg('');
              }}
              className={`py-2.5 px-4 text-xs font-bold rounded-lg transition-all text-center ${
                transferType === 'transfer'
                  ? 'bg-white text-[#012169] shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Transfer
            </button>
          </div>
        </div>

        {/* Form Body */}
        {step === 'form' ? (
          <form onSubmit={handleReview} className="p-6 sm:p-8 space-y-6">
            {errorMsg && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg text-xs text-[#d02b33] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* 1. From Account Field */}
            <div className="space-y-1.5">
              <label htmlFor="source-account-select" className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                From Account
              </label>
              <select
                id="source-account-select"
                value={sourceAccountId}
                onChange={(e) => setSourceAccountId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-[#012169] focus:ring-1 focus:ring-[#012169]"
              >
                {bankAccounts
                  .filter((a) => a.category === 'checking' || a.category === 'savings')
                  .map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} ({a.accountNumberMasked}) — Available: {formatUSD(a.availableBalance)}
                    </option>
                  ))}
              </select>
            </div>

            {/* 2. Account Name & 3. Bank Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="account-name-input" className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Account Name
                </label>
                <input
                  id="account-name-input"
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  required
                  placeholder="Enter account name"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#012169] focus:ring-1 focus:ring-[#012169]"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="bank-name-input" className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Bank Name
                </label>
                <input
                  id="bank-name-input"
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  required
                  placeholder="Enter bank name"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#012169] focus:ring-1 focus:ring-[#012169]"
                />
              </div>
            </div>

            {/* 4. Account Number */}
            <div className="space-y-1.5">
              <label htmlFor="account-number-input" className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Account Number
              </label>
              <input
                id="account-number-input"
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
                placeholder="Enter account number"
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:border-[#012169] focus:ring-1 focus:ring-[#012169]"
              />
            </div>

            {/* 5. Transfer Amount (USD) */}
            <div className="space-y-1.5">
              <label htmlFor="transfer-amount-input" className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Transfer Amount (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-lg">
                  $
                </span>
                <input
                  id="transfer-amount-input"
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="w-full pl-8 pr-4 py-2.5 text-lg font-bold font-mono text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:border-[#012169] focus:ring-1 focus:ring-[#012169]"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* 6. Reference */}
            <div className="space-y-1.5">
              <label htmlFor="transfer-reference-input" className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Reference
              </label>
              <input
                id="transfer-reference-input"
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-[#012169]"
                placeholder="Optional payment reference"
              />
            </div>

            {/* Review Button */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={onNavigateToDashboard}
                className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#012169] text-white text-sm font-bold rounded-lg hover:bg-[#00174c] shadow-sm transition-colors flex items-center gap-2"
              >
                <span>Continue to Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        ) : (
          /* Step 2: Review Screen */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
              <h3 className="font-bold text-slate-900 text-lg border-b border-slate-200 pb-3">
                Review Transfer Details
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Method:</span>
                  <span className="font-semibold text-slate-900 uppercase text-xs">
                    {transferType === 'ach' ? 'ACH Transfer' : 'Account Transfer'}
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">From Account:</span>
                  <span className="font-semibold text-slate-900">
                    {sourceAccount.name} ({sourceAccount.accountNumberMasked})
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Account Name:</span>
                  <span className="font-semibold text-slate-900">{accountName}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Bank Name:</span>
                  <span className="font-semibold text-slate-900">{bankName}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Account Number:</span>
                  <span className="font-mono font-medium text-slate-900">{accountNumber}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Transfer Amount:</span>
                  <span className="font-extrabold text-[#012169] font-mono text-base tabular-nums">
                    {formatUSD(numericAmount)}
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Transfer Fee:</span>
                  <span className="text-emerald-700 font-medium">$0.00 (Preferred Rewards Waived)</span>
                </div>

                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Reference:</span>
                  <span className="text-slate-800">{reference || 'None'}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep('form')}
                className="w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Back to Edit
              </button>

              <button
                type="button"
                onClick={handleFinalSubmit}
                className="w-full sm:w-auto px-7 py-2.5 bg-[#012169] text-white text-sm font-bold rounded-lg hover:bg-[#00174c] shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4 text-white" />
                <span>Submit Transfer</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Security note */}
      <div className="p-4 bg-slate-100/70 border border-slate-200 rounded-lg text-xs text-slate-500 flex items-start gap-2.5">
        <Lock className="w-4 h-4 text-[#012169] shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-700">Bank of America Security Guarantee:</span> Online transfers are protected by state-of-the-art encryption protocols and 24/7 account monitoring.
        </div>
      </div>
    </div>
  );
};
