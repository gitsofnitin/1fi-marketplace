import React, { useState } from 'react';
import { ArrowUpRight, Search, Sparkles, ShieldCheck, TrendingUp, Zap, ChevronRight, Calculator, CheckCircle2 } from 'lucide-react';
import { MOCK_PRODUCTS } from '../../data/mockProducts';
import { ProductCard } from '../marketplace/ProductCard';

interface HomeScreenProps {
  onNavigateToShop: () => void;
  onSelectProduct: (productId: string) => void;
  isMobileFrame?: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateToShop,
  onSelectProduct,
  isMobileFrame = false,
}) => {
  const [portfolioValue, setPortfolioValue] = useState<number>(500000);
  const eligibleLimit = Math.round(portfolioValue * 0.5);

  // Top 4 trending products for home showcase
  const trendingProducts = MOCK_PRODUCTS.slice(0, 4);

  return (
    <div className="flex flex-col gap-10 pb-8">
      {/* 1. Official 1Fi Signature Hero Section */}
      <section className={`relative w-full ${isMobileFrame ? 'pt-4 pb-2' : 'pt-8 pb-4 sm:py-12 md:py-16'} px-2 flex flex-col items-center justify-center text-center`}>
        {/* Top Pill Badge: "✦ New  No-cost EMIs backed by mutual funds" */}
        <div className="inline-flex items-center gap-2 rounded-full bg-white/95 border border-purple-150 px-3.5 py-1.5 shadow-xs mb-5 sm:mb-7 backdrop-blur-md">
          <span className="flex items-center gap-1 text-[11px] sm:text-[11.5px] font-bold text-[#712CDC] bg-purple-50 px-2 py-0.5 rounded-full">
            <Sparkles className="h-3 w-3 fill-[#712CDC]" />
            <span>New</span>
          </span>
          <span className="text-[12px] sm:text-[13px] font-semibold text-gray-700">
            No-cost EMIs backed by mutual funds
          </span>
        </div>

        {/* Signature 1Fi Headline Typography */}
        <h1
          className={`max-w-4xl font-extrabold tracking-[-0.03em] text-gray-950 leading-[1.1] ${
            isMobileFrame ? 'text-[28px]' : 'text-4xl sm:text-6xl md:text-7xl'
          }`}
        >
          <span>Shop today</span>
          <br />
          <span className="italic font-normal text-gray-400 font-serif">Pay later </span>
          <span>using</span>
          <br />
          <span className="text-[#712CDC] font-black">mutual funds.</span>
        </h1>

        {/* Dual Call to Action Buttons */}
        <div className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full px-4">
          <a
            href="#eligibility-calculator"
            className="flex items-center justify-center gap-2 rounded-2xl border-2 border-[#712CDC] bg-white px-5 sm:px-6 py-3 sm:py-3.5 text-[14px] sm:text-[15px] font-bold text-[#712CDC] shadow-xs hover:bg-purple-50/80 active:scale-95 transition-all"
          >
            <span>Check Eligibility</span>
            <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
          </a>

          <button
            type="button"
            onClick={onNavigateToShop}
            className="flex items-center justify-center gap-2 rounded-2xl bg-[#712CDC] px-6 py-3 sm:py-3.5 text-[14px] sm:text-[15px] font-bold text-white shadow-md shadow-purple-600/20 hover:bg-[#5f23bc] hover:shadow-lg hover:shadow-purple-600/25 active:scale-95 transition-all"
          >
            <span>Start Shopping</span>
            <Search className="h-4 w-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Trust Subtitle */}
        <div className="mt-6 text-center text-xs sm:text-sm font-medium text-gray-500 max-w-md leading-relaxed px-4">
          <p>
            No <strong className="text-gray-800 font-bold">credit</strong> score required. No{' '}
            <strong className="text-gray-800 font-bold">interest</strong>.
          </p>
          <p>
            Fully backed by your <strong className="text-gray-800 font-bold">investments</strong>.
          </p>
        </div>
      </section>

      {/* 2. Trending on 1Fi Marketplace Preview */}
      <section className="w-full max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#712CDC]">
              <Zap className="h-3.5 w-3.5 fill-[#712CDC]" />
              <span>1Fi Marketplace Highlights</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mt-0.5">
              Featured on 0% EMI
            </h3>
          </div>

          <button
            type="button"
            onClick={onNavigateToShop}
            className="flex items-center gap-1 text-xs sm:text-sm font-bold text-[#712CDC] hover:text-[#581dae] transition-colors"
          >
            <span>View All (16)</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* 2-column mobile or 4-column desktop grid */}
        <div className={isMobileFrame ? 'grid grid-cols-2 gap-3' : 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4'}>
          {trendingProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onSelectProduct(product.id)}
            />
          ))}
        </div>

        {/* Action Button: Explore Full Marketplace */}
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={onNavigateToShop}
            className="flex items-center gap-2 rounded-full bg-purple-50 border border-purple-200 px-6 py-2.5 text-xs sm:text-sm font-extrabold text-[#712CDC] hover:bg-purple-100 transition-all active:scale-95"
          >
            <span>Open Full 1Fi Marketplace Catalog</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* 3. Interactive Loan Against Mutual Funds (LAMF) Eligibility Calculator */}
      <section
        id="eligibility-calculator"
        className="w-full max-w-4xl mx-auto rounded-[28px] bg-gradient-to-br from-[#712CDC] via-[#8527ef] to-[#5a1ea6] p-6 sm:p-8 text-white shadow-xl scroll-mt-24"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/15 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-white shadow-xs">
              <Calculator className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                LAMF Credit Eligibility Calculator
              </h4>
              <p className="text-xs text-purple-200">
                Estimate how much credit limit you can unlock against your active portfolio
              </p>
            </div>
          </div>

          <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold text-yellow-300">
            50% LTV for Equity Funds
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-purple-200 mb-2">
              <span>Your Mutual Fund Portfolio Value:</span>
              <span className="text-base font-extrabold text-white">
                ₹{portfolioValue.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min={50000}
              max={2500000}
              step={25000}
              value={portfolioValue}
              onChange={(e) => setPortfolioValue(Number(e.target.value))}
              className="w-full h-2.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-yellow-300"
            />
            <div className="flex justify-between text-[10px] text-purple-200/80 mt-1">
              <span>₹50,000</span>
              <span>₹10,00,000</span>
              <span>₹25,00,000</span>
            </div>

            <div className="mt-4 space-y-1.5 text-xs text-purple-100">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-300 shrink-0" />
                <span>Zero documentation — verified instantly via PAN & OTP</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-300 shrink-0" />
                <span>No need to redeem mutual fund units or pay capital gains tax</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white/10 backdrop-blur-md p-5 border border-white/15 flex flex-col items-center text-center">
            <span className="text-xs font-medium text-purple-200">Your Eligible 1Fi Credit Limit</span>
            <span className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
              ₹{eligibleLimit.toLocaleString('en-IN')}
            </span>
            <span className="mt-1 text-[11px] text-yellow-300 font-semibold">
              Available instantly for 0% Interest Shopping
            </span>

            <button
              type="button"
              onClick={onNavigateToShop}
              className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-white py-3 text-xs sm:text-sm font-bold text-[#712CDC] shadow-md hover:bg-purple-50 transition-all active:scale-95"
            >
              <span>Shop on Marketplace with this Limit</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Why Choose 1Fi LAMF */}
      <section className="w-full max-w-5xl mx-auto px-2 sm:px-4">
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Why Shop with 1Fi Mutual Fund Credit?
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Traditional EMIs eat into your savings. 1Fi lets your investments keep compounding.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-white p-5 border border-gray-150 shadow-xs flex flex-col">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-[#712CDC] mb-3">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-bold text-gray-900">Compound Returns Continue</h4>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Your pledged mutual fund units continue earning market gains and dividends undisturbed.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 border border-gray-150 shadow-xs flex flex-col">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-3">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-bold text-gray-900">Zero CIBIL Impact</h4>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Backed by your own mutual fund assets, so there is no negative mark on your credit history.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 border border-gray-150 shadow-xs flex flex-col">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 mb-3">
              <Zap className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-bold text-gray-900">Zero Prepayment Penalties</h4>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Foreclose or pay off your EMIs anytime without any additional charges or hidden fees.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
