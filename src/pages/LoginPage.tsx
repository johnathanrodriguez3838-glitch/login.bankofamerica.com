import React, { useState, useEffect, useRef } from 'react';
import { BofALogo } from '../components/BofALogo';
import { CardAccentBar } from '../components/CardAccentBar';
import { DEMO_CREDENTIALS } from '../data/account';
import {
  Eye,
  EyeOff,
  Lock,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [saveUsername, setSaveUsername] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || showLoadingModal) return;

    setErrorMessage('');
    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    // Validate credentials immediately using existing logic
    const isUserValid =
      trimmedUser.toLowerCase() === DEMO_CREDENTIALS.username.toLowerCase();
    const isPassValid = DEMO_CREDENTIALS.passwords.includes(trimmedPass);

    if (!isUserValid || !isPassValid) {
      setErrorMessage(
        "The information you entered doesn't match our records. Please verify your Username and Password and try again."
      );
      return;
    }

    // Credentials are valid -> start 2-second loading modal
    setIsSubmitting(true);
    setShowLoadingModal(true);

    timerRef.current = setTimeout(() => {
      setShowLoadingModal(false);
      setIsSubmitting(false);
      onLoginSuccess();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between font-sans">
      {/* Top Header matching Reference Screenshot 1 */}
      <header className="w-full px-6 py-5 sm:px-10 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BofALogo size="md" />
        </div>
        <div className="text-xs text-slate-500 hidden sm:flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-slate-600">
            <Lock className="w-3.5 h-3.5 text-[#012169]" />
            <span>256-Bit SSL Encrypted Connection</span>
          </span>
          <span>·</span>
          <a
            href="#help"
            onClick={(e) => e.preventDefault()}
            className="text-[#0052c2] hover:underline"
          >
            Online Banking Help
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-[420px] space-y-6">
          {/* Page Heading matching Screenshot 1 */}
          <h1 className="text-2xl sm:text-[28px] font-normal text-center text-slate-900 tracking-tight">
            Log in to Online Banking
          </h1>

          {/* Login Card with signature dual top accent bar */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-md overflow-hidden">
            <CardAccentBar height="h-[6px]" />

            <div className="p-7 sm:p-8 space-y-5">
              {/* Error Alert Banner */}
              {errorMessage && (
                <div
                  className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs text-[#d02b33] flex items-start gap-2.5 animate-in fade-in"
                  role="alert"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                {/* Username Input Field - Starts empty */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="username-input"
                    className="block text-sm font-semibold text-slate-800"
                  >
                    Username
                  </label>
                  <input
                    id="username-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={isSubmitting}
                    autoComplete="username"
                    className="w-full px-3.5 py-2.5 text-sm text-slate-900 border border-slate-300 rounded-md focus:outline-none focus:border-[#012169] focus:ring-1 focus:ring-[#012169] transition-colors disabled:bg-slate-50"
                  />
                </div>

                {/* Password Input Field with Toggle - Starts empty */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password-input"
                      className="block text-sm font-semibold text-slate-800"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="password-input"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isSubmitting}
                      autoComplete="current-password"
                      className="w-full px-3.5 py-2.5 pr-10 text-sm text-slate-900 border border-slate-300 rounded-md focus:outline-none focus:border-[#012169] focus:ring-1 focus:ring-[#012169] transition-colors disabled:bg-slate-50"
                    />
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Save Username Checkbox */}
                <div className="flex items-center gap-2.5 pt-1">
                  <input
                    id="save-username"
                    type="checkbox"
                    checked={saveUsername}
                    onChange={(e) => setSaveUsername(e.target.checked)}
                    disabled={isSubmitting}
                    className="w-4 h-4 text-[#012169] border-slate-300 rounded focus:ring-[#012169]"
                  />
                  <label
                    htmlFor="save-username"
                    className="text-sm text-slate-700 select-none cursor-pointer"
                  >
                    Save username
                  </label>
                </div>

                {/* Log In Button matching Screenshot 1 */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 py-3 px-4 bg-[#012169] hover:bg-[#00174c] active:bg-[#001238] text-white font-semibold text-base rounded-full shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#012169] disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <span>Log in</span>
                  )}
                </button>
              </form>

              {/* Links matching Screenshot 1 */}
              <div className="pt-2 text-center space-y-2">
                <div>
                  <a
                    href="#forgot"
                    onClick={(e) => e.preventDefault()}
                    className="text-xs sm:text-sm font-medium text-[#0052c2] hover:underline"
                  >
                    Forgot user ID/password
                  </a>
                </div>
                <div className="flex items-center justify-center gap-3 text-xs sm:text-sm text-[#0052c2]">
                  <a
                    href="#security"
                    onClick={(e) => e.preventDefault()}
                    className="hover:underline"
                  >
                    Security & Help
                  </a>
                  <span className="text-slate-300">·</span>
                  <a
                    href="#enroll"
                    onClick={(e) => e.preventDefault()}
                    className="hover:underline"
                  >
                    Enroll
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Promotional text matching Screenshot 1 */}
          <div className="text-center pt-2 space-y-1">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              Stay connected with our app
            </h3>
            <p className="text-xs text-slate-500">
              Secure, convenient banking anytime.
            </p>
          </div>
        </div>
      </main>

      {/* Two-Second Loading Modal after successful credential validation */}
      {showLoadingModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Signing in"
        >
          <div className="w-full max-w-sm bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden transform animate-in zoom-in-95 duration-200 text-center">
            <CardAccentBar height="h-[5px]" />
            <div className="p-8 space-y-5">
              {/* Animated Spinner with BofA Colors */}
              <div className="flex justify-center">
                <div className="relative w-12 h-12">
                  <div className="w-12 h-12 rounded-full border-3 border-slate-100 border-t-[#012169] border-r-[#d02b33] animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lock className="w-4 h-4 text-[#012169]" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  Signing you in…
                </h3>
                <p className="text-xs text-slate-500">
                  Authenticating secure online banking session
                </p>
              </div>

              <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-bit encrypted connection verified</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer matching corporate standards */}
      <footer className="w-full border-t border-slate-200 py-6 px-6 bg-slate-50 text-center text-xs text-slate-500 space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-slate-600">
          <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:underline">
            Privacy
          </a>
          <a href="#security" onClick={(e) => e.preventDefault()} className="hover:underline">
            Security
          </a>
          <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:underline">
            Terms of Use
          </a>
          <a href="#careers" onClick={(e) => e.preventDefault()} className="hover:underline">
            Careers
          </a>
          <a href="#accessibility" onClick={(e) => e.preventDefault()} className="hover:underline">
            Accessibility
          </a>
        </div>
        <p className="text-[11px] text-slate-400">
          Bank of America, N.A. Member FDIC. Equal Housing Lender. © 2026 Bank of America Corporation. All rights reserved.
        </p>
      </footer>
    </div>
  );
};
