import React from 'react';

export type ShopTabType = 'top-brands' | 'nearby-stores' | 'marketplace';

interface ShopTabsProps {
  activeTab: ShopTabType;
  onChange: (tab: ShopTabType) => void;
  isDesktop?: boolean;
}

export const ShopTabs: React.FC<ShopTabsProps> = ({ activeTab, onChange, isDesktop = false }) => {
  const tabs: { id: ShopTabType; label: string; badge?: string }[] = [
    { id: 'top-brands', label: 'Top Brands' },
    { id: 'nearby-stores', label: 'Nearby Stores' },
    { id: 'marketplace', label: '1Fi Marketplace', badge: 'NEW' },
  ];

  return (
    <div
      className={`flex items-center gap-1.5 rounded-full border border-purple-100/90 bg-[#f7f4fd] p-1.5 shadow-xs transition-all ${
        isDesktop ? 'max-w-xl mx-auto w-full' : 'w-full'
      }`}
      role="tablist"
      aria-label="Shop categories"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`relative flex-1 rounded-full py-2.5 px-3 text-center text-[13px] sm:text-[14px] font-bold tracking-tight transition-all duration-200 flex items-center justify-center gap-1.5 ${
              isActive
                ? 'bg-white text-gray-950 shadow-[0_2px_8px_rgba(20,14,50,0.08),0_0_0_1px_rgba(113,44,220,0.06)]'
                : 'text-gray-500 hover:text-gray-900 hover:bg-white/40'
            }`}
          >
            <span>{tab.label}</span>
            {tab.badge && (
              <span
                className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full tracking-wider ${
                  isActive
                    ? 'bg-[#712CDC] text-white'
                    : 'bg-purple-200/90 text-[#712CDC]'
                }`}
              >
                {tab.badge}
              </span>
            )}
            {isActive && (
              <span className="absolute bottom-1 left-1/2 h-[2.5px] w-6 -translate-x-1/2 rounded-full bg-[#712CDC]" />
            )}
          </button>
        );
      })}
    </div>
  );
};
