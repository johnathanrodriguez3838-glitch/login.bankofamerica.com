import React, { useState } from 'react';
import { BofALogo } from './BofALogo';
import { CustomerProfile } from '../data/account';
import {
  Menu,
  X,
  Mail,
  ShoppingBag,
  LogOut,
  Search,
  DollarSign,
  ArrowRightLeft,
  FileText,
  User,
  Monitor,
} from 'lucide-react';

export type NavigationTab = 'overview' | 'dashboard' | 'transfer' | 'transactions' | 'profile';

interface NavigationProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onLogout: () => void;
  profile: CustomerProfile;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  onLogout,
  profile,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems: { id: NavigationTab; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Accounts', icon: DollarSign },
    { id: 'dashboard', label: 'Dashboard', icon: Monitor },
    { id: 'transfer', label: 'Pay & Transfer', icon: ArrowRightLeft },
    { id: 'transactions', label: 'Transactions', icon: FileText },
    { id: 'profile', label: 'Customer Profile', icon: User },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 select-none">
      {/* Top Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Left: Mobile hamburger & Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-slate-600 hover:text-slate-900 md:hidden rounded-lg hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div
              className="cursor-pointer"
              onClick={() => onSelectTab('overview')}
            >
              <BofALogo size="md" />
            </div>
          </div>

          {/* Center Search Input ("How can we help?") */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs mx-4">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="How can we help?"
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-100/80 focus:bg-white border border-transparent focus:border-slate-300 rounded-full focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Inbox with badge (9) */}
            <div className="relative">
              <button
                type="button"
                className="flex flex-col items-center p-1.5 text-slate-600 hover:text-slate-900 rounded-lg transition-colors"
                title="Secure Inbox (9 new alerts)"
              >
                <div className="relative">
                  <Mail className="w-5 h-5 text-slate-700" />
                  <span className="absolute -top-1.5 -right-2 bg-[#0052c2] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    9
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium hidden sm:block mt-0.5">
                  Inbox
                </span>
              </button>
            </div>

            {/* Products with badge (9) */}
            <div className="relative">
              <button
                type="button"
                className="flex flex-col items-center p-1.5 text-slate-600 hover:text-slate-900 rounded-lg transition-colors"
                title="Special Offers & Products (9)"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 text-slate-700" />
                  <span className="absolute -top-1.5 -right-2 bg-[#0052c2] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    9
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium hidden sm:block mt-0.5">
                  Products
                </span>
              </button>
            </div>

            {/* Client Profile Pill */}
            <button
              type="button"
              onClick={() => onSelectTab('profile')}
              className="hidden sm:flex items-center gap-2 pl-1.5 pr-3 py-1 bg-slate-50 hover:bg-slate-100 rounded-full border border-slate-200 transition-colors"
            >
              <div className="w-7 h-7 rounded-full overflow-hidden border border-slate-200 shrink-0 bg-[#012169] text-white flex items-center justify-center text-[10px] font-bold">
                <img
                  src={profile.avatarUrl}
                  alt={profile.preferredName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <span className="text-xs font-semibold text-slate-800 max-w-[120px] truncate">
                Michael Baumann
              </span>
            </button>

            {/* Log Out Icon */}
            <button
              type="button"
              onClick={onLogout}
              className="flex flex-col items-center p-1.5 text-slate-600 hover:text-[#d02b33] rounded-lg transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-[10px] text-slate-500 font-medium hidden sm:block mt-0.5">
                Log out
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation Tabs Bar with Bank of America Red Indicator Bar */}
      <div className="hidden md:block bg-slate-50/80 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-1 sm:space-x-8">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectTab(item.id)}
                  className={`py-3.5 px-1 text-sm font-semibold transition-all relative whitespace-nowrap flex items-center gap-2 ${
                    isActive
                      ? 'text-[#d02b33]'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <item.icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-[#d02b33]' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                  {/* Bank of America Red Underline Bar */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#d02b33] rounded-t-full" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white p-4 space-y-2 shadow-lg animate-in slide-in-from-top duration-150">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 shrink-0 bg-[#012169] text-white flex items-center justify-center text-xs font-bold">
                <img
                  src={profile.avatarUrl}
                  alt={profile.preferredName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm">{profile.fullName}</div>
                <div className="text-[11px] text-slate-500 font-mono">{profile.username}</div>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#012169]">
              Platinum Honors
            </span>
          </div>

          <div className="space-y-1 pt-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-left transition-colors ${
                    isActive
                      ? 'bg-red-50 text-[#d02b33]'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
            <button
              type="button"
              onClick={onLogout}
              className="text-xs font-semibold text-[#d02b33] flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
