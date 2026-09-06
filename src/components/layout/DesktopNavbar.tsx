import React from 'react';
import { ArrowUpRight, Smartphone, Bug, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';
import type { NavTab } from './BottomNav';

interface DesktopNavbarProps {
  activeNavTab: NavTab;
  onNavTabChange: (tab: NavTab) => void;
  isMobileFrame: boolean;
  onToggleMobileFrame: (val: boolean) => void;
  onTriggerSimulateError?: () => void;
  onOpenCalculator?: () => void;
}

export const DesktopNavbar: React.FC<DesktopNavbarProps> = ({
  activeNavTab,
  onNavTabChange,
  isMobileFrame,
  onToggleMobileFrame,
  onTriggerSimulateError,
  onOpenCalculator,
}) => {
  const [isErrorMode, setIsErrorMode] = React.useState(api.getSimulateError());

  const handleToggleError = () => {
    const next = !isErrorMode;
    api.setSimulateError(next);
    setIsErrorMode(next);
    if (onTriggerSimulateError) {
      onTriggerSimulateError();
    }
  };

  const navLinks = [
    { label: 'Home', tab: 'home' as NavTab },
    { label: 'About Us', action: () => alert('1Fi (OneFinancial) empowers Indian investors to borrow against their mutual funds at 0% interest without selling their investments.') },
    { label: 'How it Works', action: () => alert('1. Link your mutual fund portfolio via CAMS/KFintech\n2. Select your gadget on 1Fi Marketplace\n3. Choose 0% interest EMI plan (3 to 24 months)\n4. Instant approval without CIBIL impact!') },
    { label: 'Shop', tab: 'shop' as NavTab },
    { label: 'Calculator', action: () => onOpenCalculator ? onOpenCalculator() : onNavTabChange('limit') },
    { label: 'Contact Us', action: () => alert('Contact 1Fi Support: support@1fi.in | WhatsApp: +91 99999 1FI00') },
    { label: 'Partner With Us', action: () => alert('1Fi Merchant Partnerships: partner@1fi.in') },
    { label: 'FAQs', action: () => alert('1Fi LAMF FAQs:\n• No CIBIL score required\n• Zero foreclosure charges\n• Retain 100% of your mutual fund compounding and dividends') },
  ];

  return (
    <div className="w-full flex flex-col items-center pt-2 px-4 sm:px-6 lg:px-8 z-50">
      {/* Top Utility Evaluator Bar */}
      <div className="w-full max-w-7xl flex items-center justify-between py-1 px-2 text-[11px] text-gray-500">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-[#712CDC]">1Fi SDE Assignment</span>
          <span className="text-gray-300">|</span>
          <span className="font-medium text-gray-600">Candidate: Nitin Kumar</span>
          <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
            <CheckCircle2 className="h-3 w-3" />
            <span>Submission Ready</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToggleError}
            title="Toggle simulated network error"
            className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border transition-all ${
              isErrorMode
                ? 'bg-red-50 text-red-700 border-red-200 animate-pulse'
                : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <Bug className="h-3 w-3" />
            <span>{isErrorMode ? 'Simulated Error: ON' : 'Test Error Flow'}</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleMobileFrame(!isMobileFrame)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#712CDC]/10 text-[#712CDC] hover:bg-[#712CDC]/20 transition-all border border-[#712CDC]/20"
          >
            <Smartphone className="h-3 w-3" />
            <span>View Mobile App Frame</span>
          </button>
        </div>
      </div>

      {/* Official 1Fi Floating Desktop Navbar */}
      <header className="w-full max-w-7xl mt-1 bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full border border-gray-150 shadow-[0_4px_24px_rgba(113,44,220,0.06)] px-5 sm:px-7 py-3 flex items-center justify-between transition-all">
        {/* Left: 1Fi Brand Logo */}
        <div
          onClick={() => onNavTabChange('shop')}
          className="flex items-center gap-2 cursor-pointer group select-none"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#712CDC] to-[#9333ea] text-white shadow-sm font-black text-base transition-transform group-hover:scale-105">
            1Fi
          </div>
          <span className="text-xl font-extrabold tracking-tight text-gray-900 group-hover:text-[#712CDC] transition-colors">
            1Fi
          </span>
        </div>

        {/* Center: Official Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => {
            const isActive = link.tab ? activeNavTab === link.tab : false;
            return (
              <button
                key={link.label}
                type="button"
                onClick={() => {
                  if (link.tab) {
                    onNavTabChange(link.tab);
                  } else if (link.action) {
                    link.action();
                  }
                }}
                className={`text-[13.5px] font-semibold transition-all hover:text-[#712CDC] ${
                  isActive ? 'text-[#712CDC] font-bold' : 'text-gray-600'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Button: "Shop Now ↗" */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavTabChange('shop')}
            className="flex items-center gap-1.5 rounded-full bg-[#712CDC] px-5 py-2 text-sm font-bold text-white shadow-md shadow-purple-600/25 hover:bg-[#5f23bc] hover:shadow-lg hover:shadow-purple-600/30 transition-all active:scale-95"
          >
            <span>Shop Now</span>
            <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
          </button>
        </div>
      </header>
    </div>
  );
};
