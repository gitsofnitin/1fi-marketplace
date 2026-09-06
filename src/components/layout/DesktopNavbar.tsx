import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { NavTab } from './BottomNav';

interface DesktopNavbarProps {
  activeNavTab: NavTab;
  onNavTabChange: (tab: NavTab) => void;
  onOpenCalculator?: () => void;
}

export const DesktopNavbar: React.FC<DesktopNavbarProps> = ({
  activeNavTab,
  onNavTabChange,
  onOpenCalculator,
}) => {
  const navLinks = [
    { label: 'Home', tab: 'home' as NavTab },
    {
      label: 'About Us',
      action: () =>
        alert(
          '1Fi (OneFinancial) is India’s 1st platform enabling investors to borrow against mutual funds at 0% interest without liquidating their investments.'
        ),
    },
    {
      label: 'How it Works',
      action: () =>
        alert(
          'How 1Fi Works:\n1. Pledge Mutual Funds online via CAMS / KFintech\n2. Get instant credit limit without CIBIL impact\n3. Shop gadgets on 0% EMI while your investments continue compounding!'
        ),
    },
    { label: 'Shop', tab: 'shop' as NavTab },
    {
      label: 'Calculator',
      action: () => (onOpenCalculator ? onOpenCalculator() : onNavTabChange('limit')),
    },
    {
      label: 'Contact Us',
      action: () => alert('1Fi Support: support@1fi.in | WhatsApp: +91 99999 1FI00'),
    },
    {
      label: 'Partner With Us',
      action: () => alert('Merchant Partnerships: partner@1fi.in'),
    },
    {
      label: 'FAQs',
      action: () =>
        alert(
          '1Fi FAQs:\n• No credit score / CIBIL required\n• ₹0 foreclosure / prepayment penalty\n• Earn 100% of mutual fund returns while paying EMI'
        ),
    },
  ];

  return (
    <div className="w-full flex justify-center pt-4 px-4 sm:px-6 lg:px-8 z-50 sticky top-0 pointer-events-none">
      {/* Official 1Fi Floating Navbar matching 1Fi Website */}
      <header className="w-full max-w-6xl bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full border border-gray-150 shadow-[0_4px_24px_rgba(20,14,50,0.06)] px-6 sm:px-8 py-3 flex items-center justify-between transition-all pointer-events-auto">
        {/* Left: 1Fi Official Brand Logo Badge */}
        <div
          onClick={() => onNavTabChange('home')}
          className="flex items-center cursor-pointer group select-none"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#712CDC] to-[#8c27fc] text-white shadow-sm font-black text-lg tracking-tight transition-transform group-hover:scale-105">
            1Fi
          </div>
        </div>

        {/* Center: Official Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
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
                className={`text-[14px] font-medium transition-all hover:text-[#712CDC] ${
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
            className="flex items-center gap-1.5 rounded-full bg-[#712CDC] px-6 py-2.5 text-[14px] font-bold text-white shadow-md shadow-purple-600/25 hover:bg-[#5b1ea8] hover:shadow-lg hover:shadow-purple-600/30 transition-all active:scale-95"
          >
            <span>Shop Now</span>
            <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
          </button>
        </div>
      </header>
    </div>
  );
};
