import React from 'react';
import type { ProductCategory } from '../../types/product';
import { Smartphone, Laptop, Headphones, Watch, LayoutGrid } from 'lucide-react';

interface CategoryFilterProps {
  selected: ProductCategory;
  onSelect: (category: ProductCategory) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ selected, onSelect }) => {
  const categories: { id: ProductCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'All', label: 'All', icon: <LayoutGrid className="h-3.5 w-3.5" /> },
    { id: 'Smartphones', label: 'Phones', icon: <Smartphone className="h-3.5 w-3.5" /> },
    { id: 'Laptops', label: 'Laptops', icon: <Laptop className="h-3.5 w-3.5" /> },
    { id: 'Audio', label: 'Audio', icon: <Headphones className="h-3.5 w-3.5" /> },
    { id: 'Wearables', label: 'Watches', icon: <Watch className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
      {categories.map((cat) => {
        const isActive = selected === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelect(cat.id)}
            className={`flex items-center gap-1.5 shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-tight transition-all active:scale-95 ${
              isActive
                ? 'bg-[#712CDC] text-white shadow-[0_2px_8px_rgba(113,44,220,0.25)]'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:text-gray-900 shadow-sm'
            }`}
          >
            {cat.icon}
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
};
