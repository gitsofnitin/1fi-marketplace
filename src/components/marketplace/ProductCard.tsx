import React from 'react';
import type { Product } from '../../types/product';
import { Star, ChevronRight, Zap } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(product.basePrice);

  const formattedOriginalPrice = product.originalBasePrice
    ? new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(product.originalBasePrice)
    : null;

  const formattedEmi = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(product.startingEmi);

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className="group relative flex flex-col sm:flex-row gap-3.5 rounded-[22px] border border-zinc-200/90 bg-white p-3.5 text-left shadow-[0_2px_8px_rgba(20,14,50,0.04)] hover:shadow-[0_8px_20px_rgba(113,44,220,0.08)] hover:border-[#712CDC]/30 transition-all cursor-pointer active:scale-[0.99]"
    >
      {/* Product Image Thumbnail */}
      <div className="relative flex h-32 sm:h-28 sm:w-28 w-full items-center justify-center rounded-2xl bg-gradient-to-b from-gray-50 to-purple-50/30 p-2 overflow-hidden shrink-0 border border-gray-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top left badge if any */}
        {product.badge && (
          <div className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-md px-2 py-0.5 text-[9.5px] font-bold text-[#712CDC] shadow-xs">
            <Zap className="h-2.5 w-2.5 fill-[#712CDC]" />
            <span>{product.badge.split('•')[0].trim()}</span>
          </div>
        )}
      </div>

      {/* Content Details */}
      <div className="flex flex-1 flex-col justify-between py-0.5">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-[11.5px] font-semibold text-gray-700 bg-gray-50 px-1.5 py-0.5 rounded-md">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-gray-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h4 className="mt-1 text-[15px] font-bold tracking-[-0.012em] text-gray-900 line-clamp-1 group-hover:text-[#712CDC] transition-colors">
            {product.name}
          </h4>

          {/* Short tagline */}
          {product.tagline && (
            <p className="mt-0.5 text-[12px] text-gray-500 line-clamp-1">
              {product.tagline}
            </p>
          )}
        </div>

        {/* Pricing & EMI Pill */}
        <div className="mt-3 flex items-end justify-between border-t border-gray-100 pt-2.5">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[16px] font-extrabold text-gray-900 tracking-tight">
                {formattedPrice}
              </span>
              {formattedOriginalPrice && (
                <span className="text-[12px] text-gray-400 line-through">
                  {formattedOriginalPrice}
                </span>
              )}
            </div>

            {/* 1Fi EMI starting from */}
            <div className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-bold text-[#712CDC] bg-[#f5f0ff] px-2 py-0.5 rounded-full border border-[#ece5ff]">
              <span>EMI from {formattedEmi}/mo</span>
            </div>
          </div>

          {/* Action Arrow */}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-400 group-hover:bg-[#712CDC] group-hover:text-white transition-all">
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
