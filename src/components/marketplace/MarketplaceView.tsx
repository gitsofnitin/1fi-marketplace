import React from 'react';
import { useProducts } from '../../hooks/useProducts';
import { SearchBar } from '../common/SearchBar';
import { CategoryFilter } from './CategoryFilter';
import { ProductCard } from './ProductCard';
import { SkeletonLoader } from '../common/SkeletonLoader';
import { ErrorCard } from '../common/ErrorCard';
import { EmptyState } from '../common/EmptyState';
import { Search, Sparkles } from 'lucide-react';

interface MarketplaceViewProps {
  onSelectProduct: (productId: string) => void;
  isMobileFrame?: boolean;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  onSelectProduct,
  isMobileFrame = false,
}) => {
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

  return (
    <div className="flex flex-col gap-4">
      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search iPhones, Pixels, Galaxies, MacBooks..."
      />

      {/* Category Pills */}
      <CategoryFilter
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Title & Count */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <h3 className="text-[18px] font-bold tracking-[-0.015em] text-gray-900">
            {selectedCategory === 'All' ? 'Featured Products' : selectedCategory}
          </h3>
          {!loading && !error && (
            <span className="rounded-full bg-purple-50 text-[#712CDC] text-[11px] font-bold px-2 py-0.5 border border-purple-100">
              {products.length} {products.length === 1 ? 'item' : 'items'}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-[11.5px] font-semibold text-[#712CDC]">
          <Sparkles className="h-3.5 w-3.5 fill-[#712CDC]" />
          <span>0% Interest EMIs</span>
        </div>
      </div>

      {/* Dynamic Content States */}
      {loading ? (
        <SkeletonLoader count={6} isMobileFrame={isMobileFrame} />
      ) : error ? (
        <ErrorCard message={error} onRetry={retry} />
      ) : products.length === 0 ? (
        <EmptyState
          icon={<Search className="h-7 w-7" />}
          title="No matching products found"
          description={`We couldn't find any products matching "${searchQuery}". Try searching for something else.`}
          actionText="Clear Search"
          onAction={() => setSearchQuery('')}
        />
      ) : (
        <div className={isMobileFrame ? 'grid grid-cols-2 gap-3' : 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'}>
          {products.map((product) => (
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
