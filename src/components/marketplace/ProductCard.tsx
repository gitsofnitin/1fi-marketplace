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

  const discountPercent =
    product.originalBasePrice && product.originalBasePrice > product.basePrice
      ? Math.round(((product.originalBasePrice - product.basePrice) / product.originalBasePrice) * 100)
      : null;

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
      className="group relative flex flex-col justify-between rounded-[22px] border border-zinc-200/80 bg-white p-3 text-left shadow-[0_2px_8px_rgba(20,14,50,0.03)] hover:shadow-[0_10px_24px_rgba(113,44,220,0.12)] hover:border-[#712CDC]/40 transition-all duration-200 cursor-pointer active:scale-[0.98] overflow-hidden"
    >
      {/* Top Section: Image & Badges */}
      <div>
        <div className="relative aspect-square w-full rounded-[18px] bg-gradient-to-b from-gray-50/90 via-white to-purple-50/20 p-2.5 flex items-center justify-center overflow-hidden border border-gray-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />

          {/* Top-left Badge (0% Interest or Instant Approval) */}
          {product.badge && (
            <div className="absolute top-2 left-2 inline-flex items-center gap-0.5 rounded-full bg-white/95 backdrop-blur-md px-1.5 py-0.5 text-[9px] font-bold text-[#712CDC] shadow-xs border border-purple-100/80">
              <Zap className="h-2.5 w-2.5 fill-[#712CDC]" />
              <span>{product.badge.split('•')[0].trim()}</span>
            </div>
          )}

          {/* Top-right Rating Chip */}
          <div className="absolute top-2 right-2 inline-flex items-center gap-0.5 rounded-full bg-white/95 backdrop-blur-md px-1.5 py-0.5 text-[9.5px] font-bold text-gray-800 shadow-xs border border-gray-100">
            <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
          </div>
        </div>

        {/* Brand & Title */}
        <div className="mt-2 px-0.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              {product.brand}
            </span>
            {discountPercent && (
              <span className="text-[9.5px] font-bold text-emerald-600 bg-emerald-50 px-1 py-0.2 rounded">
                {discountPercent}% OFF
              </span>
            )}
          </div>
          <h4 className="mt-0.5 text-[13px] sm:text-[13.5px] font-bold tracking-[-0.01em] text-gray-900 leading-snug line-clamp-2 min-h-[36px] group-hover:text-[#712CDC] transition-colors">
            {product.name}
          </h4>
        </div>
      </div>

      {/* Bottom Section: Pricing & 1Fi EMI Pill */}
      <div className="mt-2.5 px-0.5 border-t border-gray-100/80 pt-2 flex flex-col gap-1.5">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[15px] font-black text-gray-900 tracking-tight">
            {formattedPrice}
          </span>
          {formattedOriginalPrice && (
            <span className="text-[11px] text-gray-400 line-through font-normal">
              {formattedOriginalPrice}
            </span>
          )}
        </div>

        {/* 1Fi EMI Starting From Pill */}
        <div className="flex items-center justify-between rounded-xl bg-[#f5f0ff] border border-[#ece5ff] px-2 py-1.5 text-[#712CDC] transition-colors group-hover:bg-[#eee5fc]">
          <span className="text-[10.5px] font-extrabold tracking-tight">
            EMI from {formattedEmi}/mo
          </span>
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[#712CDC] shadow-2xs transition-transform group-hover:translate-x-0.5">
            <ChevronRight className="h-3 w-3" />
          </div>
        </div>
      </div>
    </div>
  );
};
