import React from 'react';
import type { ProductVariant } from '../../types/product';
import { Check } from 'lucide-react';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant;
  onSelect: (variant: ProductVariant) => void;
  basePrice: number;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  selectedVariant,
  onSelect,
  basePrice,
}) => {
  // Extract unique storages and colors if present
  const hasStorage = variants.some((v) => v.storage);
  const uniqueColors = Array.from(new Set(variants.map((v) => v.color)));

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-xs">
      {/* 1. Storage Variants */}
      {hasStorage && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-bold text-gray-900">Choose Storage</span>
            <span className="text-xs font-semibold text-[#712CDC]">
              {selectedVariant.storage || selectedVariant.name}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {variants
              .filter((v, i, arr) => arr.findIndex((x) => x.storage === v.storage) === i)
              .map((variant) => {
                const isSelected = selectedVariant.storage === variant.storage;
                const priceDiff = variant.price - basePrice;

                return (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => {
                      // Keep current color if possible
                      const matchWithColor = variants.find(
                        (v) => v.storage === variant.storage && v.color === selectedVariant.color
                      );
                      onSelect(matchWithColor || variant);
                    }}
                    className={`flex items-center justify-between gap-2.5 rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition-all active:scale-95 ${
                      isSelected
                        ? 'border-[#712CDC] bg-[#f5f0ff] text-[#712CDC] shadow-xs'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span>{variant.storage || variant.name}</span>
                    {priceDiff !== 0 && (
                      <span className={`text-[10px] font-normal ${isSelected ? 'text-[#712CDC]' : 'text-gray-400'}`}>
                        {priceDiff > 0 ? `+₹${priceDiff.toLocaleString('en-IN')}` : ''}
                      </span>
                    )}
                  </button>
                );
              })}
          </div>
        </div>
      )}

      {/* 2. Color Variants */}
      {uniqueColors.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-bold text-gray-900">Choose Color</span>
            <span className="text-xs font-semibold text-gray-600">
              {selectedVariant.color}
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {variants
              .filter((v, i, arr) => arr.findIndex((x) => x.color === v.color) === i)
              .map((variant) => {
                const isSelected = selectedVariant.color === variant.color;

                return (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => {
                      // Keep current storage if possible
                      const matchWithStorage = variants.find(
                        (v) => v.color === variant.color && v.storage === selectedVariant.storage
                      );
                      onSelect(matchWithStorage || variant);
                    }}
                    className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-all active:scale-95 ${
                      isSelected
                        ? 'border-[#712CDC] bg-[#f5f0ff] text-[#712CDC] shadow-xs'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {/* Color dot */}
                    <span
                      className="h-3.5 w-3.5 rounded-full border border-black/10 shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: variant.colorHex }}
                    >
                      {isSelected && <Check className="h-2 w-2 text-white drop-shadow-xs" />}
                    </span>
                    <span>{variant.color}</span>
                  </button>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};
