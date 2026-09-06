import React from 'react';
import type { Product } from '../../types/product';
import { Star, ChevronRight, Zap, Sparkles } from 'lucide-react';

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
      className="group relative flex flex-col justify-between rounded-[24px] border border-zinc-200/90 bg-white p-4 text-left shadow-[0_2px_8px_rgba(20,14,50,0.04)] hover:shadow-[0_12px_28px_rgba(113,44,220,0.10)] hover:border-[#712CDC]/40 transition-all duration-300 cursor-pointer active:scale-[0.99]"
    >
      <div>
        {/* Product Image Thumbnail */}
        <div className="relative flex h-48 w-full items-center justify-center rounded-2xl bg-gradient-to-b from-gray-50/80 to-purple-50/30 p-3 overflow-hidden border border-gray-100/80">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />

          {/* Top left badge if any */}
          {product.badge && (
            <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 rounded-full bg-white/95 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-[#712CDC] shadow-xs border border-purple-100">
              <Zap className="h-3 w-3 fill-[#712CDC]" />
              <span>{product.badge.split('•')[0].trim()}</span>
            </div>
          )}

          {/* 0% interest pill */}
          <div className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9.5px] font-bold text-emerald-700 border border-emerald-200/80 shadow-xs">
            <Sparkles className="h-2.5 w-2.5 fill-emerald-600" />
            <span>0% EMI</span>
          </div>
        </div>

        {/* Content Details */}
        <div className="mt-3.5">
          {/* Brand & Rating */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-[11.5px] font-semibold text-gray-700 bg-gray-50 px-2 py-0.5 rounded-md">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-gray-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h4 className="mt-1 text-[15.5px] font-bold tracking-[-0.012em] text-gray-900 line-clamp-1 group-hover:text-[#712CDC] transition-colors">
            {product.name}
          </h4>

          {/* Short tagline */}
          {product.tagline && (
            <p className="mt-0.5 text-[12px] text-gray-500 line-clamp-2 leading-relaxed">
              {product.tagline}
            </p>
          )}
        </div>
      </div>

      {/* Pricing & EMI Pill */}
      <div className="mt-4 border-t border-gray-100 pt-3">
        <div className="flex items-baseline gap-2">
          <span className="text-[17px] font-black text-gray-900 tracking-tight">
            {formattedPrice}
          </span>
          {formattedOriginalPrice && (
            <span className="text-[12.5px] text-gray-400 line-through">
              {formattedOriginalPrice}
            </span>
          )}
        </div>

        {/* 1Fi EMI Pill + Action CTA */}
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#712CDC] bg-[#f5f0ff] px-2.5 py-1 rounded-full border border-[#ece5ff]">
            <span>EMI from {formattedEmi}/mo</span>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-[#712CDC] group-hover:translate-x-1 transition-transform">
            <span>Explore</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
