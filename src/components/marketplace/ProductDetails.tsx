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
  ArrowUpRight,
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
      <div className="p-4 sm:p-8 space-y-6">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-[#712CDC]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Marketplace</span>
        </button>
        <SkeletonLoader count={4} />
      </div>
    );
  }

  if (error || !product || !selectedVariant) {
    return (
      <div className="p-4 sm:p-8 space-y-6">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-[#712CDC]"
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

  const savingsAmount = (selectedVariant.originalPrice || currentPrice) - currentPrice;

  return (
    <div className="relative pb-28 sm:pb-32">
      {/* Top Header / Back Navigation */}
      <div className="flex items-center justify-between py-3 border-b border-gray-200/80 mb-6">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-[#712CDC] transition-colors py-1.5 px-3 rounded-xl hover:bg-gray-100 active:scale-95"
        >
          <ArrowLeft className="h-4 w-4 stroke-[2.5]" />
          <span>Back to Marketplace</span>
        </button>

        <span className="text-xs sm:text-sm font-bold text-[#712CDC] bg-purple-50 border border-purple-100 px-3 py-1 rounded-full uppercase tracking-wider">
          {product.category}
        </span>
      </div>

      {/* Main Split Layout: Left Column (Large Image Stage) | Right Column (Product Details & EMI Flow) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Big Product Showcase Stage & Thumbnails */}
        <div className="lg:col-span-6 flex flex-col gap-4 lg:sticky lg:top-24">
          {/* Main Big Stage */}
          <div className="relative h-80 sm:h-96 lg:h-[500px] w-full flex items-center justify-center rounded-3xl bg-gradient-to-b from-gray-50/90 via-white to-purple-50/30 p-6 sm:p-10 border border-gray-200/80 shadow-xs overflow-hidden group">
            <img
              src={currentDisplayImage}
              alt={product.name}
              className="h-full w-full object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
            />

            {/* Top-left Badge */}
            {product.badge && (
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-xs font-bold text-[#712CDC] shadow-xs border border-purple-150">
                <Zap className="h-3.5 w-3.5 fill-[#712CDC]" />
                <span>{product.badge}</span>
              </div>
            )}

            {/* Top-right Rating */}
            <div className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-white/95 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-gray-800 shadow-xs border border-gray-150">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Large Thumbnails Selector */}
          {product.images.length > 1 && (
            <div className="flex gap-3 justify-center overflow-x-auto no-scrollbar py-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`h-16 w-16 sm:h-20 sm:w-20 rounded-2xl border p-1.5 bg-white transition-all overflow-hidden flex items-center justify-center ${
                    activeImageIndex === idx
                      ? 'border-[#712CDC] shadow-sm ring-2 ring-purple-200 scale-105'
                      : 'border-gray-200 opacity-60 hover:opacity-100 hover:border-gray-300'
                  }`}
                >
                  <img src={img} alt="thumb" className="h-full w-full object-contain" />
                </button>
              ))}
            </div>
          )}

          {/* 1Fi Core Value Pillars */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white border border-gray-150 shadow-xs">
              <TrendingUp className="h-5 w-5 text-[#712CDC] mb-1.5" />
              <span className="text-xs font-bold text-gray-900">Compound Returns</span>
              <span className="text-[11px] text-gray-500 mt-0.5">Retain MF gains</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white border border-gray-150 shadow-xs">
              <ShieldCheck className="h-5 w-5 text-emerald-600 mb-1.5" />
              <span className="text-xs font-bold text-gray-900">Zero CIBIL Impact</span>
              <span className="text-[11px] text-gray-500 mt-0.5">Asset-backed credit</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white border border-gray-150 shadow-xs">
              <RotateCcw className="h-5 w-5 text-blue-600 mb-1.5" />
              <span className="text-xs font-bold text-gray-900">₹0 Foreclosure</span>
              <span className="text-[11px] text-gray-500 mt-0.5">Pay off anytime</span>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Pricing, Variant Selection, and EMI Plans */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Header Info */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#712CDC]">
                {product.brand}
              </span>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-700 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-200">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-gray-400 font-normal">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-gray-950 leading-tight">
              {product.name}
            </h1>

            {product.tagline && (
              <p className="mt-2 text-sm sm:text-base text-gray-600 font-medium leading-relaxed">
                {product.tagline}
              </p>
            )}
          </div>

          {/* Big Price Card */}
          <div className="flex flex-wrap items-baseline gap-3 rounded-2xl bg-gradient-to-r from-purple-50/80 via-white to-purple-50/20 p-4 sm:p-5 border border-purple-150 shadow-xs">
            <span className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">
              {formattedPrice}
            </span>
            {formattedOriginalPrice && (
              <span className="text-base sm:text-lg text-gray-400 line-through font-normal">
                {formattedOriginalPrice}
              </span>
            )}
            {savingsAmount > 0 && (
              <span className="ml-auto text-xs sm:text-sm font-extrabold text-emerald-700 bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-full">
                Save ₹{savingsAmount.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Variant Selection (Storage & Color) */}
          <VariantSelector
            variants={product.variants}
            selectedVariant={selectedVariant}
            onSelect={setSelectedVariant}
            basePrice={product.basePrice}
          />

          {/* EMI Plans (The Core LAMF Feature) */}
          <EMIPlanSelector
            plans={emiPlans}
            selectedPlan={selectedEmiPlan}
            onSelectPlan={setSelectedEmiPlan}
            productPrice={currentPrice}
          />

          {/* Highlights & Technical Specifications */}
          <div className="space-y-4 pt-2">
            {/* Highlights */}
            <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">
                Key Highlights
              </h3>
              <ul className="space-y-2.5">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700 leading-snug">
                    <CheckCircle className="h-4 w-4 text-[#712CDC] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specs Table */}
            <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">
                Technical Specifications
              </h3>
              <div className="divide-y divide-gray-100 text-sm">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2.5">
                    <span className="text-gray-500 font-medium">{key}</span>
                    <span className="font-bold text-gray-900 text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar with EMI summary and Proceed CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200/80 p-3 sm:p-4 shadow-[0_-4px_24px_rgba(20,14,50,0.08)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-500 font-semibold">Selected EMI:</span>
              <span className="text-xs font-bold text-[#712CDC]">
                {selectedEmiPlan ? `${selectedEmiPlan.tenureMonths} Mo Plan` : '12 Mo Plan'}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-2xl font-black text-gray-950 tracking-tight">
                {selectedEmiPlan
                  ? new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    maximumFractionDigits: 0,
                  }).format(selectedEmiPlan.monthlyEmi)
                  : ''}
              </span>
              <span className="text-xs text-gray-500 font-medium">/month</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowOrderSheet(true)}
            disabled={!selectedEmiPlan}
            className="flex items-center gap-2 rounded-2xl bg-[#712CDC] px-6 sm:px-10 py-3.5 text-sm sm:text-base font-extrabold text-white shadow-lg shadow-purple-600/25 hover:bg-[#5b1ea8] active:scale-95 transition-all disabled:opacity-50"
          >
            <span>Proceed with EMI</span>
            <ArrowUpRight className="h-5 w-5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Order & Loan Application Sheet / Modal */}
      {showOrderSheet && selectedEmiPlan && (
        <OrderSummarySheet
          product={product}
          variant={selectedVariant}
          selectedPlan={selectedEmiPlan}
          onClose={() => setShowOrderSheet(false)}
          onSuccess={() => {
            setShowOrderSheet(false);
          }}
        />
      )}
    </div>
  );
};
