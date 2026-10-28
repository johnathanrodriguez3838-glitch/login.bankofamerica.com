import React, { useEffect, useRef } from 'react';
import { ShieldAlert, PhoneCall, Building2, X } from 'lucide-react';
import { CardAccentBar } from './CardAccentBar';
import { BofALogo } from './BofALogo';

interface TransactionRestrictionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReturnToDashboard: () => void;
}

export const TransactionRestrictionModal: React.FC<TransactionRestrictionModalProps> = ({
  isOpen,
  onClose,
  onReturnToDashboard,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Focus primary button when modal opens
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-[2px] transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="restriction-modal-title"
      aria-describedby="restriction-modal-description"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all duration-200 animate-in fade-in zoom-in-95"
      >
        {/* Top signature accent bar */}
        <CardAccentBar height="h-[6px]" />

        {/* Modal Header */}
        <div className="px-6 pt-5 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BofALogo size="sm" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Account Notice
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#012169]"
            aria-label="Close notification"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-6 sm:px-8">
          <div className="flex items-start gap-4">
            {/* Restrained calm status icon */}
            <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[#012169] shrink-0 mt-0.5">
              <ShieldAlert className="w-6 h-6 text-[#012169]" strokeWidth={2} />
            </div>

            <div className="space-y-3">
              <h2
                id="restriction-modal-title"
                className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight"
              >
                Unable to Complete Transaction
              </h2>

              <p
                id="restriction-modal-description"
                className="text-sm sm:text-base text-slate-600 leading-relaxed"
              >
                Transactions are currently unavailable for this account. Please contact the bank through its verified official channels to review the account status and determine the appropriate steps required to restore transaction access.
              </p>
            </div>
          </div>

          {/* Official Bank Advisory Assistance Details */}
          <div className="mt-6 pt-5 border-t border-slate-100 bg-slate-50/70 -mx-6 sm:-mx-8 px-6 sm:px-8 py-4">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
              Official Verification Channels
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#012169] shrink-0" />
                <span>
                  Client Advisory:{' '}
                  <strong className="text-slate-900 font-medium">1-888-555-0199</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#012169] shrink-0" />
                <span>San Diego Sixth Ave Financial Center</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Reference code: <span className="font-mono text-slate-600">HOLD-AUTH-9021-ADV</span> · Account: <span className="font-mono text-slate-600">...3432</span>
            </p>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="px-6 py-4 sm:px-8 bg-slate-50 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={onReturnToDashboard}
            className="w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#012169]"
          >
            Return to Dashboard
          </button>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-white bg-[#012169] rounded-lg hover:bg-[#00174c] shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#012169]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
