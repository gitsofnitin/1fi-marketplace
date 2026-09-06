import React, { useState } from 'react';
import { ShieldCheck, Zap, TrendingUp } from 'lucide-react';

export const ShopHeroBanner: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-[#712CDC] to-[#4c1d95] shadow-[0_8px_24px_rgba(113,44,220,0.12)]">
      {/* Official 1Fi Production Banner */}
      {!imageError ? (
        <div className="relative overflow-hidden flex flex-col items-center">
          <img
            src="https://cdn.1fi.in/banners/shop-page%201536x1024.webp"
            alt="Shop today, Pay later using Mutual funds"
            onError={() => setImageError(true)}
            className="w-full h-auto max-h-[340px] object-contain sm:object-cover object-top"
          />

          {/* Value props ribbon below image */}
          <div className="w-full bg-gradient-to-r from-[#712CDC] to-[#8c27fc] px-5 py-3 flex flex-wrap items-center justify-between gap-3 text-white text-xs font-semibold border-t border-white/20">
            <div className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-yellow-300 fill-yellow-300" />
              <span>0% No-Cost EMI</span>
            </div>
            <span className="hidden sm:inline text-white/40">•</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-green-300" />
              <span>No CIBIL Score Required</span>
            </div>
            <span className="hidden sm:inline text-white/40">•</span>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-purple-200" />
              <span>Continue Earning MF Returns</span>
            </div>
          </div>
        </div>
      ) : (
        /* Fallback rich gradient banner if CDN is unavailable */
        <div className="p-6 sm:p-8 text-white">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white mb-3">
            <Zap className="h-3.5 w-3.5 fill-yellow-300 text-yellow-300" />
            <span>India's 1st LAMF Shopping</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
            Shop today, Pay later <br />
            <span className="text-purple-200">using mutual funds.</span>
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-purple-100 max-w-[42ch]">
            Enjoy 0% interest EMIs while your mutual funds continue compounding and growing in the market.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4 pt-3 border-t border-white/15 text-xs font-semibold">
            <div className="flex items-center gap-1.5 text-white/95">
              <ShieldCheck className="h-4 w-4 text-green-300" />
              <span>No CIBIL Check</span>
            </div>
            <span className="text-white/40">•</span>
            <div className="flex items-center gap-1.5 text-white/95">
              <TrendingUp className="h-4 w-4 text-purple-200" />
              <span>Retain Returns</span>
            </div>
            <span className="text-white/40">•</span>
            <div className="flex items-center gap-1.5 text-white/95">
              <span className="font-bold text-yellow-300">0%</span>
              <span>No-cost EMI</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
