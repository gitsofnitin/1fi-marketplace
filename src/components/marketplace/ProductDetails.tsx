import React, { useState } from 'react';
import { useProductDetails } from '../../hooks/useProductDetails';
import { VariantSelector } from './VariantSelector';
import { EMIPlanSelector } from './EMIPlanSelector';
import { OrderSummarySheet } from './OrderSummarySheet';
import { SkeletonLoader } from '../common/SkeletonLoader';
import { ErrorCard } from '../common/ErrorCard';
import {
  ArrowLeft,
  Star,
  ShieldCheck,
  Zap,
  TrendingUp,
  RotateCcw,
  CheckCircle,
  Sparkles,
} from 'lucide-react';

interface ProductDetailsProps {
  productId: string;
  onBack: () => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ productId, onBack }) => {
  const {
    product,
    selectedVariant,
    setSelectedVariant,
    emiPlans,
    selectedEmiPlan,
    setSelectedEmiPlan,
    currentPrice,
    loading,
    error,
    retry,
  } = useProductDetails(productId);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showOrderSheet, setShowOrderSheet] = useState(false);

  if (loading) {
    return (
      <div className="p-4 space-y-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-[#712CDC]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Marketplace</span>
        </button>
        <SkeletonLoader count={3} />
      </div>
    );
  }

  if (error || !product || !selectedVariant) {
    return (
      <div className="p-4 space-y-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-[#712CDC]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Marketplace</span>
        </button>
        <ErrorCard message={error || 'Product not found'} onRetry={retry} />
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(currentPrice);

  const formattedOriginalPrice = selectedVariant.originalPrice
    ? new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(selectedVariant.originalPrice)
    : null;

  const currentDisplayImage =
    selectedVariant.image && activeImageIndex === 0
      ? selectedVariant.image
      : product.images[activeImageIndex] || product.images[0];

  return (
    <div className="relative pb-28">
      {/* Top Header / Back Navigation */}
      <div className="flex items-center justify-between py-2 border-b border-gray-100 mb-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-[#712CDC] transition-colors py-1 px-2 rounded-lg hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Products</span>
        </button>

        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          {product.category}
        </span>
      </div>

      {/* Main Image Gallery */}
      <div className="flex flex-col items-center">
        <div className="relative h-64 w-full flex items-center justify-center rounded-3xl bg-gradient-to-b from-gray-50 to-purple-50/20 p-4 border border-gray-100 overflow-hidden">
          <img
            src={currentDisplayImage}
            alt={product.name}
            className="h-full w-full object-contain transition-all duration-300"
          />

          {product.badge && (
            <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-md px-2.5 py-1 text-[10.5px] font-bold text-[#712CDC] shadow-xs">
              <Zap className="h-3 w-3 fill-[#712CDC]" />
              <span>{product.badge}</span>
            </div>
          )}
        </div>

        {/* Thumbnail Selector */}
        {product.images.length > 1 && (
          <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar py-1">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`h-14 w-14 rounded-xl border p-1 bg-white transition-all overflow-hidden ${activeImageIndex === idx
                    ? 'border-[#712CDC] shadow-xs ring-2 ring-purple-100'
                    : 'border-gray-200 opacity-60 hover:opacity-100'
                  }`}
              >
                <img src={img} alt="thumb" className="h-full w-full object-contain" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Title, Brand, Rating */}
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
            {product.brand}
          </span>
          <div className="flex items-center gap-1 text-xs font-semibold text-gray-700 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
            <span className="text-gray-400 font-normal">({product.reviewsCount} reviews)</span>
          </div>
        </div>

        <h2 className="mt-1 text-xl font-bold tracking-tight text-gray-900 leading-tight">
          {product.name}
        </h2>

        {product.tagline && (
          <p className="mt-1 text-xs text-gray-500 leading-relaxed">
            {product.tagline}
          </p>
        )}
      </div>

      {/* Pricing Header */}
      <div className="mt-4 flex items-baseline gap-2 rounded-2xl bg-gradient-to-r from-purple-50/60 to-transparent p-3.5 border border-purple-100/50">
        <span className="text-2xl font-black text-gray-900 tracking-tight">
          {formattedPrice}
        </span>
        {formattedOriginalPrice && (
          <span className="text-sm text-gray-400 line-through">
            {formattedOriginalPrice}
          </span>
        )}
        <span className="ml-auto text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
          Save ₹{((selectedVariant.originalPrice || currentPrice) - currentPrice).toLocaleString('en-IN')}
        </span>
      </div>

      {/* 1Fi Key Benefits Row */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center text-center p-2.5 rounded-2xl bg-white border border-gray-100 shadow-xs">
          <TrendingUp className="h-4 w-4 text-[#712CDC] mb-1" />
          <span className="text-[10.5px] font-bold text-gray-800">Earn Returns</span>
          <span className="text-[9.5px] text-gray-400">MF compounding</span>
        </div>
        <div className="flex flex-col items-center text-center p-2.5 rounded-2xl bg-white border border-gray-100 shadow-xs">
          <ShieldCheck className="h-4 w-4 text-emerald-600 mb-1" />
          <span className="text-[10.5px] font-bold text-gray-800">No CIBIL</span>
          <span className="text-[9.5px] text-gray-400">Score not needed</span>
        </div>
        <div className="flex flex-col items-center text-center p-2.5 rounded-2xl bg-white border border-gray-100 shadow-xs">
          <RotateCcw className="h-4 w-4 text-blue-600 mb-1" />
          <span className="text-[10.5px] font-bold text-gray-800">₹0 Foreclosure</span>
          <span className="text-[9.5px] text-gray-400">Close anytime</span>
        </div>
      </div>

      {/* Variant Selection */}
      <div className="mt-5">
        <VariantSelector
          variants={product.variants}
          selectedVariant={selectedVariant}
          onSelect={setSelectedVariant}
          basePrice={product.basePrice}
        />
      </div>

      {/* EMI Plans (The Core Section) */}
      <div className="mt-6">
        <EMIPlanSelector
          plans={emiPlans}
          selectedPlan={selectedEmiPlan}
          onSelectPlan={setSelectedEmiPlan}
          productPrice={currentPrice}
        />
      </div>

      {/* Product Highlights & Specs */}
      <div className="mt-6 space-y-4">
        {/* Features */}
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xs">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">
            Key Highlights
          </h4>
          <ul className="space-y-2">
            {product.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-700 leading-snug">
                <CheckCircle className="h-3.5 w-3.5 text-[#712CDC] shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Specs Table */}
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xs">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">
            Technical Specifications
          </h4>
          <div className="divide-y divide-gray-100 text-xs">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="flex justify-between py-2">
                <span className="text-gray-500">{key}</span>
                <span className="font-semibold text-gray-900 text-right">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar with Proceed CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="mx-auto flex max-w-[500px] items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-semibold text-gray-500">
              {selectedEmiPlan ? `${selectedEmiPlan.tenureMonths} Mo Plan` : 'Selected Price'}
            </div>
            <div className="text-lg font-black text-[#712CDC] tracking-tight">
              {selectedEmiPlan
                ? `₹${selectedEmiPlan.monthlyEmi.toLocaleString('en-IN')}/mo`
                : formattedPrice}
            </div>
          </div>

          <button
            type="button"
            disabled={!selectedEmiPlan}
            onClick={() => setShowOrderSheet(true)}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#712CDC] hover:bg-[#5b24b5] py-3.5 px-4 text-sm font-bold text-white shadow-md transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            <Sparkles className="h-4 w-4 fill-white" />
            <span>Proceed with EMI</span>
          </button>
        </div>
      </div>

      {/* Order & Loan Summary Bottom Sheet */}
      {showOrderSheet && selectedEmiPlan && (
        <OrderSummarySheet
          product={product}
          variant={selectedVariant}
          selectedPlan={selectedEmiPlan}
          onClose={() => setShowOrderSheet(false)}
          onSuccess={() => {
            // Callback when loan is approved
          }}
        />
      )}
    </div>
  );
};
