import React, { useState } from 'react';
import { customerProfile } from '../data/account';
import { CardAccentBar } from '../components/CardAccentBar';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  ShieldCheck,
  Calendar,
  Award,
  DollarSign,
  Building2,
  FileCheck,
  Info,
  Lock,
} from 'lucide-react';

interface ProfilePageProps {
  onNavigateToDashboard: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigateToDashboard }) => {
  const [imageError, setImageError] = useState(false);

  const formatUSD = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(val);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb & Title */}
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
          <span className="text-slate-700 font-medium">Customer Profile</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Customer Profile & Identity
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Verified customer records, private wealth advisory credentials, and contact data.
        </p>
      </div>

      {/* Main Identity Banner Card with Dedicated Profile Image */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <CardAccentBar />

        <div className="p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            {/* Dedicated Profile Photo Container */}
            <div className="relative group shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-slate-100 shadow-md bg-slate-100">
                {!imageError ? (
                  <img
                    src={customerProfile.avatarUrl}
                    alt={`${customerProfile.fullName} Profile`}
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0a2540] to-[#012169] text-white">
                    <span className="font-extrabold text-2xl tracking-wider">MB</span>
                    <span className="text-[10px] text-slate-300 uppercase tracking-widest mt-0.5">Verified</span>
                  </div>
                )}
              </div>

              {/* Status Badge */}
              <div
                className="absolute bottom-1 right-1 w-7 h-7 bg-[#012169] text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                title="Verified Preferred Client"
              >
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {customerProfile.fullName}
                </h2>
                <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Verified Identity
                </span>
              </div>
              <p className="text-sm text-slate-600 font-medium">
                {customerProfile.occupation} · {customerProfile.city}, {customerProfile.state}
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-[#012169] font-bold">
                <Award className="w-4 h-4 text-[#d02b33]" />
                <span>{customerProfile.tier}</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-500 font-normal">Member since {customerProfile.memberSince}</span>
              </div>
            </div>
          </div>

          {/* Balance summary pill */}
          <div className="w-full md:w-auto p-4 bg-slate-50 rounded-xl border border-slate-200 text-center md:text-right shrink-0">
            <span className="text-xs text-slate-500 font-medium block">Total Available Balance</span>
            <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums block mt-0.5">
              {formatUSD(customerProfile.totalAvailableBalance)}
            </span>
            <span className="text-[11px] text-emerald-700 font-medium mt-1 inline-block">
              Liquid Operating & Savings
            </span>
          </div>
        </div>

        {/* Structured Profile Sections */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Section 1: Personal Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
              <User className="w-4 h-4 text-[#012169]" />
              <span>Personal Information</span>
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Surname:</span>
                <span className="font-semibold text-slate-900">{customerProfile.surname}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Middle Name:</span>
                <span className="font-semibold text-slate-900">{customerProfile.middleName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Last Name:</span>
                <span className="font-semibold text-slate-900">{customerProfile.lastName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Date of Birth:</span>
                <span className="font-medium text-slate-800">{customerProfile.dateOfBirth}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Gender:</span>
                <span className="font-medium text-slate-800">{customerProfile.gender}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Occupation:</span>
                <span className="font-semibold text-slate-900">{customerProfile.occupation}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Contact & Residential Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
              <MapPin className="w-4 h-4 text-[#012169]" />
              <span>Contact & Address</span>
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Username:</span>
                <span className="font-mono font-semibold text-slate-900">{customerProfile.username}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Email Address:</span>
                <span className="font-medium text-slate-800">{customerProfile.email}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Phone Number:</span>
                <span className="font-medium text-slate-800">{customerProfile.phone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Residential Address:</span>
                <span className="font-medium text-slate-800 text-right">{customerProfile.address}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">City & State:</span>
                <span className="font-medium text-slate-800">{customerProfile.city}, {customerProfile.state}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Country:</span>
                <span className="font-medium text-slate-800">{customerProfile.country}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Dedicated Private Wealth Advisory Contact */}
        <div className="p-6 sm:p-8 bg-slate-50/70 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-4">
            <Building2 className="w-4 h-4 text-[#012169]" />
            <span>Assigned Private Client Relationship Advisory</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <span className="text-slate-400 block mb-1">Senior Advisory Manager</span>
              <span className="font-bold text-slate-900 text-sm block">
                {customerProfile.clientRelationshipManager.name}
              </span>
              <span className="text-slate-500 mt-0.5 block">
                {customerProfile.clientRelationshipManager.office}
              </span>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <span className="text-slate-400 block mb-1">Direct Advisory Line</span>
              <span className="font-bold text-slate-900 text-sm block">
                {customerProfile.clientRelationshipManager.phone}
              </span>
              <span className="text-slate-500 mt-0.5 block">Priority routing 24/7</span>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200 sm:col-span-2 md:col-span-1">
              <span className="text-slate-400 block mb-1">Secure Advisory Inquiries</span>
              <span className="font-medium text-[#0052c2] text-xs block truncate">
                {customerProfile.clientRelationshipManager.email}
              </span>
              <span className="text-emerald-700 text-[11px] font-semibold mt-1 block">
                Direct Officer Contact
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
