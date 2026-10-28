import React, { useState } from 'react';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { AccountOverview } from './components/AccountOverview';
import { TransferPage } from './pages/TransferPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { ProfilePage } from './pages/ProfilePage';
import { Navigation, NavigationTab } from './components/Navigation';
import { TransactionRestrictionModal } from './components/TransactionRestrictionModal';
import { customerProfile, bankAccounts, BankAccount } from './data/account';
import { BofALogo } from './components/BofALogo';
import {
  DollarSign,
  ArrowRightLeft,
  FileText,
  User,
} from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<NavigationTab>('overview');
  const [restrictionModalOpen, setRestrictionModalOpen] = useState<boolean>(false);
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentTab('overview');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setRestrictionModalOpen(false);
  };

  // If user is not logged in, show Login Screen (matching Screenshot 1)
  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#1e293b] flex flex-col font-sans selection:bg-[#d02b33]/20 selection:text-[#012169]">
      {/* Top Header & Navigation */}
      <Navigation
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onLogout={handleLogout}
        profile={customerProfile}
      />

      {/* Main Viewport Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 md:pb-12">
        {currentTab === 'overview' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Accounts & Balances
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Deposit accounts, commercial card services, and wealth management portfolios.
                </p>
              </div>
            </div>

            <AccountOverview
              onNavigateToTransfer={() => setCurrentTab('transfer')}
              onNavigateToTransactions={() => setCurrentTab('transactions')}
              onSelectAccount={(acct) => setSelectedAccount(acct)}
            />
          </div>
        )}

        {currentTab === 'dashboard' && (
          <Dashboard
            profile={customerProfile}
            onNavigateToTransfer={() => setCurrentTab('transfer')}
            onNavigateToTransactions={() => setCurrentTab('transactions')}
            onNavigateToProfile={() => setCurrentTab('profile')}
            onNavigateToAccounts={() => setCurrentTab('overview')}
          />
        )}

        {currentTab === 'transfer' && (
          <TransferPage
            onTriggerRestrictionModal={() => setRestrictionModalOpen(true)}
            onNavigateToDashboard={() => setCurrentTab('overview')}
          />
        )}

        {currentTab === 'transactions' && (
          <TransactionsPage
            profile={customerProfile}
            onNavigateToDashboard={() => setCurrentTab('overview')}
          />
        )}

        {currentTab === 'profile' && (
          <ProfilePage
            onNavigateToDashboard={() => setCurrentTab('overview')}
          />
        )}
      </main>

      {/* Mobile Floating Bottom Bar for Viewports below md */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-40 px-3 py-2 flex items-center justify-around shadow-lg"
        aria-label="Mobile Navigation"
      >
        <button
          type="button"
          onClick={() => setCurrentTab('overview')}
          className={`flex flex-col items-center py-1 transition-colors ${
            currentTab === 'overview' ? 'text-[#d02b33] font-bold' : 'text-slate-500'
          }`}
        >
          <DollarSign className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Accounts</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentTab('transfer')}
          className={`flex flex-col items-center py-1 transition-colors ${
            currentTab === 'transfer' ? 'text-[#d02b33] font-bold' : 'text-slate-500'
          }`}
        >
          <ArrowRightLeft className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Transfer</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentTab('transactions')}
          className={`flex flex-col items-center py-1 transition-colors ${
            currentTab === 'transactions' ? 'text-[#d02b33] font-bold' : 'text-slate-500'
          }`}
        >
          <FileText className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Ledger</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentTab('profile')}
          className={`flex flex-col items-center py-1 transition-colors ${
            currentTab === 'profile' ? 'text-[#d02b33] font-bold' : 'text-slate-500'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Profile</span>
        </button>
      </nav>

      {/* Transaction Restriction Modal */}
      <TransactionRestrictionModal
        isOpen={restrictionModalOpen}
        onClose={() => setRestrictionModalOpen(false)}
        onReturnToDashboard={() => {
          setRestrictionModalOpen(false);
          setCurrentTab('overview');
        }}
      />

      {/* Corporate Bank of America Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BofALogo size="sm" />
            <span className="text-slate-400">·</span>
            <span>Online & Mobile Banking</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-slate-600">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:underline">
              Privacy & Security
            </a>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:underline">
              Terms of Use
            </a>
            <a href="#routing" onClick={(e) => e.preventDefault()} className="hover:underline">
              Routing #026009593
            </a>
            <a href="#fdic" onClick={(e) => e.preventDefault()} className="hover:underline">
              Member FDIC
            </a>
            <a href="#equal" onClick={(e) => e.preventDefault()} className="hover:underline">
              Equal Housing Lender
            </a>
          </div>

          <div className="text-slate-400 text-[11px] text-center md:text-right">
            © 2026 Bank of America Corporation. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
