import React from 'react';

export type ShopTabType = 'top-brands' | 'nearby-stores' | 'marketplace';

interface ShopTabsProps {
  activeTab: ShopTabType;
  onChange: (tab: ShopTabType) => void;
}

export const ShopTabs: React.FC<ShopTabsProps> = ({ activeTab, onChange }) => {
  const tabs: { id: ShopTabType; label: string; badge?: string }[] = [
    { id: 'top-brands', label: 'Top Brands' },
    { id: 'nearby-stores', label: 'Nearby Stores' },
    { id: 'marketplace', label: '1Fi Marketplace', badge: 'New' },
  ];

  return (
    <div
      className="flex gap-1.5 rounded-full border border-[#ece5ff] bg-[#f5f0ff] p-1.5 shadow-[0_1px_3px_rgba(113,44,220,0.06)]"
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
            className={`relative flex-1 rounded-full py-[10px] px-2 text-center text-[12.5px] sm:text-sm font-semibold tracking-[-0.005em] transition-all flex items-center justify-center gap-1.5 ${
              isActive
                ? 'bg-white text-[#712CDC] shadow-[0_1px_3px_rgba(20,14,50,0.10),0_0_0_1px_rgba(113,44,220,0.08)]'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <span>{tab.label}</span>
            {tab.badge && (
              <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                isActive ? 'bg-[#712CDC] text-white' : 'bg-purple-200/80 text-[#712CDC]'
              }`}>
                {tab.badge}
              </span>
            )}
            {isActive && (
              <span className="absolute bottom-1 left-1/2 h-[2.5px] w-[20px] -translate-x-1/2 rounded-full bg-[#712CDC]" />
            )}
          </button>
        );
      })}
    </div>
  );
};
