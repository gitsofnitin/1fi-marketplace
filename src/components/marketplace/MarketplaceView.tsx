import React, { useState, useMemo } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { SearchBar } from '../common/SearchBar';
import { CategoryFilter } from './CategoryFilter';
import { ProductCard } from './ProductCard';
import { SkeletonLoader } from '../common/SkeletonLoader';
import { ErrorCard } from '../common/ErrorCard';
import { EmptyState } from '../common/EmptyState';
import { Search, Sparkles, ArrowDownUp } from 'lucide-react';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'emi-asc';

interface MarketplaceViewProps {
  onSelectProduct: (productId: string) => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({ onSelectProduct }) => {
  const {
    products,
    loading,
    error,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    retry,
  } = useProducts();

  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');

  // Extract available brands
  const brands = useMemo(() => {
    const set = new Set(products.map((p) => p.brand));
    return ['All', ...Array.from(set)];
  }, [products]);

  // Apply Brand Filter and Sorting dynamically
  const sortedAndFilteredProducts = useMemo(() => {
    let list = [...products];

    // Brand filter
    if (selectedBrand !== 'All') {
      list = list.filter((p) => p.brand === selectedBrand);
    }

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.basePrice - a.basePrice);
    } else if (sortBy === 'emi-asc') {
      list.sort((a, b) => a.startingEmi - b.startingEmi);
    }

    return list;
  }, [products, selectedBrand, sortBy]);

  return (
    <div className="flex flex-col gap-4">
      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search iPhones, Pixels, Galaxies, MacBooks..."
      />

      {/* Category Filter */}
      <CategoryFilter
        selected={selectedCategory}
        onSelect={(cat) => {
          setSelectedCategory(cat);
          setSelectedBrand('All');
        }}
      />

      {/* Secondary Row: Brand Filter & Sort By Dropdown */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-0.5">
        {/* Brand Selector Pills */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mr-1">
            Brand:
          </span>
          {brands.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setSelectedBrand(b)}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all ${
                selectedBrand === b
                  ? 'bg-gray-900 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-1 shrink-0 ml-auto">
          <ArrowDownUp className="h-3 w-3 text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-[11px] font-semibold text-gray-700 outline-none focus:border-[#712CDC]"
            aria-label="Sort products"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="emi-asc">Lowest EMI</option>
          </select>
        </div>
      </div>

      {/* Title & Count */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <h3 className="text-[17px] font-bold tracking-[-0.015em] text-gray-900">
            {selectedCategory === 'All' ? 'All Products' : selectedCategory}
          </h3>
          {!loading && !error && (
            <span className="rounded-full bg-purple-50 text-[#712CDC] text-[11px] font-bold px-2 py-0.5 border border-purple-100">
              {sortedAndFilteredProducts.length}{' '}
              {sortedAndFilteredProducts.length === 1 ? 'item' : 'items'}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          <Sparkles className="h-3 w-3 fill-emerald-600" />
          <span>0% No-Cost EMI Available</span>
        </div>
      </div>

      {/* Dynamic Content States */}
      {loading ? (
        <SkeletonLoader count={4} />
      ) : error ? (
        <ErrorCard message={error} onRetry={retry} />
      ) : sortedAndFilteredProducts.length === 0 ? (
        <EmptyState
          icon={<Search className="h-7 w-7" />}
          title="No matching products found"
          description={`We couldn't find any products matching your filters. Try selecting a different category or clearing search.`}
          actionText="Reset Filters"
          onAction={() => {
            setSearchQuery('');
            setSelectedBrand('All');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {sortedAndFilteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onSelectProduct(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
