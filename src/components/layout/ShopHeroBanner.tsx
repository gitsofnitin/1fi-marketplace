import React from 'react';
import { ArrowUpRight, Search, Sparkles, ShieldCheck, TrendingUp, Zap } from 'lucide-react';

interface ShopHeroBannerProps {
  isDesktop?: boolean;
  onCheckEligibility?: () => void;
  onStartShopping?: () => void;
}

export const ShopHeroBanner: React.FC<ShopHeroBannerProps> = ({
  isDesktop = false,
  onCheckEligibility,
  onStartShopping,
}) => {
  if (isDesktop) {
    return (
      <section className="relative w-full py-12 md:py-16 px-4 flex flex-col items-center justify-center text-center">
        {/* Top Pill Badge: "✦ New  No-cost EMIs backed by mutual funds" */}
        <div className="inline-flex items-center gap-2 rounded-full bg-white/90 border border-purple-150 px-4 py-1.5 shadow-xs mb-6 backdrop-blur-md">
          <span className="flex items-center gap-1 text-[11.5px] font-bold text-[#712CDC] bg-purple-50 px-2 py-0.5 rounded-full">
            <Sparkles className="h-3 w-3 fill-[#712CDC]" />
            <span>New</span>
          </span>
          <span className="text-[13px] font-semibold text-gray-700">
            No-cost EMIs backed by mutual funds
          </span>
        </div>

        {/* Signature 1Fi Typography Headline */}
        <h1 className="max-w-4xl text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.03em] text-gray-950 leading-[1.08]">
          <span>Shop today</span>
          <br />
          <span className="italic font-normal text-gray-400 font-serif">Pay later </span>
          <span>using</span>
          <br />
          <span className="text-[#712CDC] font-black">mutual funds.</span>
        </h1>

        {/* Dual Call to Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={onCheckEligibility}
            className="flex items-center gap-2 rounded-2xl border-2 border-[#712CDC] bg-white px-6 py-3.5 text-[15px] font-bold text-[#712CDC] shadow-xs hover:bg-purple-50/80 active:scale-95 transition-all"
          >
            <span>Check Eligibility</span>
            <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={onStartShopping}
            className="flex items-center gap-2 rounded-2xl bg-[#712CDC] px-6 py-3.5 text-[15px] font-bold text-white shadow-md shadow-purple-600/20 hover:bg-[#5f23bc] hover:shadow-lg hover:shadow-purple-600/25 active:scale-95 transition-all"
          >
            <span>Start Shopping</span>
            <Search className="h-4 w-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Trust Subtitle */}
        <div className="mt-6 text-center text-sm font-medium text-gray-500 max-w-md leading-relaxed">
          <p>
            No <strong className="text-gray-800 font-bold">credit</strong> score required. No{' '}
            <strong className="text-gray-800 font-bold">interest</strong>.
          </p>
          <p>
            Fully backed by your <strong className="text-gray-800 font-bold">investments</strong>.
          </p>
        </div>
      </section>
    );
  }

  // Mobile Device Frame / Compact Banner View
  return (
    <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#712CDC] via-[#8525f0] to-[#5b1ea8] p-5 text-white shadow-[0_8px_24px_rgba(113,44,220,0.18)]">
      {/* Background Graphic Accents */}
      <div className="absolute -right-6 -top-6 h-36 w-36 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute -left-6 -bottom-6 h-36 w-36 rounded-full bg-black/10 blur-2xl pointer-events-none" />

      {/* Pill Badge */}
      <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-white mb-3">
        <Zap className="h-3 w-3 fill-yellow-300 text-yellow-300" />
        <span>India's 1st LAMF Shopping</span>
      </div>

      {/* Heading matching signature copy */}
      <h2 className="text-2xl font-extrabold tracking-tight text-white leading-tight">
        Shop today, <br />
        <span className="italic font-normal text-purple-200 font-serif">Pay later </span>
        <span className="text-white font-bold">using </span>
        <span className="text-yellow-300 font-extrabold">mutual funds.</span>
      </h2>

      <p className="mt-2 text-[12.5px] leading-snug text-purple-100 max-w-[32ch]">
        Enjoy 0% interest EMIs while your mutual funds continue compounding and growing.
      </p>

      {/* Feature Badges */}
      <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 border-t border-white/15">
        <div className="flex items-center gap-1 text-[10.5px] font-medium text-white/90">
          <ShieldCheck className="h-3.5 w-3.5 text-green-300" />
          <span>No CIBIL Check</span>
        </div>
        <span className="text-white/40">•</span>
        <div className="flex items-center gap-1 text-[10.5px] font-medium text-white/90">
          <TrendingUp className="h-3.5 w-3.5 text-purple-200" />
          <span>Retain MF Returns</span>
        </div>
        <span className="text-white/40">•</span>
        <div className="flex items-center gap-1 text-[10.5px] font-medium text-white/90">
          <span className="font-bold text-yellow-300">0%</span>
          <span>No-cost EMI</span>
        </div>
      </div>
    </div>
  );
};
