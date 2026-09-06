import React, { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { SearchBar } from '../common/SearchBar';
import { EmptyState } from '../common/EmptyState';

export const NearbyStoresTab: React.FC = () => {
  const [query, setQuery] = useState('');
  const [location] = useState('Gurugram, HR');

  return (
    <div className="flex flex-col gap-4">
      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search nearby offline stores..."
      />

      <div className="flex items-center justify-between">
        <h3 className="text-[19px] font-bold tracking-[-0.018em] text-gray-900">
          Nearby Stores
        </h3>
        {/* Location selector pill matching 1Fi */}
        <button
          type="button"
          className="flex items-center gap-1 rounded-full border border-[#dcd2ff] bg-white px-2.5 py-1 text-[12px] font-semibold text-[#712CDC] shadow-sm hover:bg-[#f7f3ff] transition-colors"
        >
          <MapPin className="h-3 w-3" />
          <span>{location}</span>
          <ChevronDown className="h-3 w-3 text-gray-400" />
        </button>
      </div>

      <EmptyState
        icon={<MapPin className="h-7 w-7" />}
        title="No nearby stores found"
        description="We could not find partner retail stores in this pincode. Try searching for products in the 1Fi Marketplace instead."
      />
    </div>
  );
};
