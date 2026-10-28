import React, { useState } from 'react';
import { CustomerProfile } from '../data/account';
import { CardAccentBar } from './CardAccentBar';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  ShieldCheck,
  Calendar,
  Award,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface ProfileCardProps {
  profile: CustomerProfile;
  onNavigateToFullProfile?: () => void;
  compact?: boolean;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onNavigateToFullProfile,
  compact = false,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden transition-all">
      <CardAccentBar />

      <div className="p-5 sm:p-6">
        {/* Top Header Row with Avatar & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-4">
            {/* Dedicated Replaceable Profile Image Container */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-slate-200 shadow-sm bg-slate-100 shrink-0">
              {!imageError ? (
                <img
                  src={profile.avatarUrl}
                  alt={`${profile.fullName} Profile`}
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0a2540] to-[#012169] text-white">
                  <span className="font-bold text-lg sm:text-xl tracking-wider">MB</span>
                  <span className="text-[9px] text-slate-300 uppercase tracking-tight">Client</span>
                </div>
              )}
              {/* Verified badge */}
              <div
                className="absolute bottom-0 right-0 w-5 h-5 bg-[#012169] text-white rounded-full flex items-center justify-center border-2 border-white shadow-xs"
                title="Verified Client Profile"
              >
                <ShieldCheck className="w-3 h-3 text-white" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  {profile.fullName}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                {profile.occupation} · San Diego, CA
              </p>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-[#012169] font-semibold">
                <Award className="w-3.5 h-3.5 text-[#d02b33]" />
                <span>{profile.tier}</span>
              </div>
            </div>
          </div>

          {onNavigateToFullProfile && (
            <button
              type="button"
              onClick={onNavigateToFullProfile}
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#0052c2] hover:text-[#012169] transition-colors self-start sm:self-center"
            >
              <span>View Full Profile</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Profile Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">User ID</span>
            <span className="font-semibold text-slate-800 font-mono">{profile.username}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Member Since</span>
            <span className="font-semibold text-slate-800">{profile.memberSince}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Date of Birth</span>
            <span className="font-semibold text-slate-800">{profile.dateOfBirth}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Gender</span>
            <span className="font-semibold text-slate-800">{profile.gender}</span>
          </div>
        </div>

        {!compact && (
          <div className="mt-2 pt-3 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{profile.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{profile.phone}</span>
            </div>
            <div className="flex items-center gap-2 md:col-span-2">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{profile.address}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
