import React from 'react';
import { Home, Store, ReceiptIndianRupee, ChartNoAxesCombined, User } from 'lucide-react';

export type NavTab = 'home' | 'shop' | 'emi-dues' | 'limit' | 'profile';

interface BottomNavProps {
  activeTab?: NavTab;
  onTabChange?: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab = 'shop',
  onTabChange,
}) => {
  const navItems = [
    { id: 'home' as NavTab, label: 'Home', icon: Home },
    { id: 'shop' as NavTab, label: 'Shop', icon: Store },
    { id: 'emi-dues' as NavTab, label: 'EMI Dues', icon: ReceiptIndianRupee },
    { id: 'limit' as NavTab, label: 'Limit', icon: ChartNoAxesCombined },
    { id: 'profile' as NavTab, label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(10px+env(safe-area-inset-bottom))] pointer-events-none">
      <div className="mx-auto flex max-w-[500px] items-stretch rounded-[28px] bg-white/95 backdrop-blur-md border border-white/60 px-1.5 py-1.5 shadow-[0_8px_32px_rgba(20,14,50,0.12),0_0_0_1px_rgba(255,255,255,0.2)_inset] pointer-events-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange && onTabChange(item.id)}
              className={`group relative flex min-w-0 flex-1 flex-col items-center justify-center gap-[3px] rounded-[18px] px-1 py-2 text-center transition-all duration-200 active:scale-95 ${
                isActive ? 'text-[#712CDC]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {/* Active Top Bar Indicator */}
              {isActive && (
                <span
                  className="absolute left-1/2 -top-[3px] h-[3px] w-7 -translate-x-1/2 rounded-full bg-[#712CDC]"
                  aria-hidden="true"
                />
              )}

              {/* Active Radial Glow */}
              {isActive && (
                <span
                  className="absolute inset-1 rounded-[14px] opacity-40 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(ellipse at 50% 30%, rgba(113,44,220,0.18) 0%, transparent 70%)',
                  }}
                  aria-hidden="true"
                />
              )}

              <Icon
                className={`relative h-[22px] w-[22px] transition-transform duration-200 group-active:scale-90 ${
                  isActive
                    ? 'drop-shadow-[0_0_8px_rgba(113,44,220,0.35)]'
                    : 'stroke-[1.75]'
                }`}
              />
              <span
                className={`relative max-w-full truncate text-[10px] tracking-wide ${
                  isActive ? 'font-bold' : 'font-medium'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
