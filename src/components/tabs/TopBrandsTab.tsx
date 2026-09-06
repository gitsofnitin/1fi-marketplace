import React, { useState } from 'react';
import { Truck } from 'lucide-react';
import { SearchBar } from '../common/SearchBar';
import { EmptyState } from '../common/EmptyState';

export const TopBrandsTab: React.FC = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="flex flex-col gap-4">
      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search online brand stores..."
      />

      <div className="flex items-center justify-between">
        <h3 className="text-[19px] font-bold tracking-[-0.018em] text-gray-900">
          Top Brands
        </h3>
        <span className="text-xs font-semibold text-gray-400">Online Stores</span>
      </div>

      <EmptyState
        icon={<Truck className="h-7 w-7" />}
        title="Online brand stores coming soon"
        description="No-cost EMIs on partner brand websites will arrive in a future update. Explore the 1Fi Marketplace for instant orders."
      />
    </div>
  );
};
