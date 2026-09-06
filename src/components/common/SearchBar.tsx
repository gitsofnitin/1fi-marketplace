import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search products, brands or models...',
}) => {
  return (
    <div className="flex items-center gap-[10px] h-[46px] rounded-full border border-gray-200 bg-white px-4 shadow-[0_1px_3px_rgba(20,14,50,0.03)] transition-all focus-within:border-[#712CDC] focus-within:shadow-[0_0_0_2px_rgba(113,44,220,0.12)]">
      <Search className="h-[17px] w-[17px] text-gray-400 shrink-0" strokeWidth={2} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent border-0 outline-none text-[13.5px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 shadow-none"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
};
