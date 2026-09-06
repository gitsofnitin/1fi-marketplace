import React, { useState } from 'react';
import { ShieldCheck, Zap, TrendingUp } from 'lucide-react';

export const ShopHeroBanner: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-[26px] shadow-[0_8px_24px_rgba(113,44,220,0.14)]">
      {/* Official 1Fi Production Banner */}
      {!imageError ? (
        <div className="relative overflow-hidden bg-gradient-to-br from-[#712CDC] to-[#4c1d95]">
          <img
            src="https://cdn.1fi.in/banners/shop-page%201536x1024.webp"
            alt="Shop today, Pay later using Mutual funds"
            onError={() => setImageError(true)}
            className="w-full h-auto object-cover min-h-[160px] max-h-[220px]"
          />

          {/* Quick value badges banner below the image */}
          <div className="bg-gradient-to-r from-[#712CDC] to-[#8c27fc] px-4 py-2.5 flex items-center justify-between text-white text-[10.5px] font-semibold border-t border-white/20">
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-yellow-300 fill-yellow-300" />
              <span>0% No-Cost EMI</span>
            </div>
            <span className="text-white/40">•</span>
            <div className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-green-300" />
              <span>No CIBIL Check</span>
            </div>
            <span className="text-white/40">•</span>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-purple-200" />
              <span>Retain Returns</span>
            </div>
          </div>
        </div>
      ) : (
        /* Fallback rich gradient banner if CDN is unavailable */
        <div className="bg-gradient-to-br from-[#712CDC] via-[#8c27fc] to-[#5c22a5] p-5 text-white">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-white mb-3">
            <Zap className="h-3 w-3 fill-yellow-300 text-yellow-300" />
            <span>India's 1st LAMF Shopping</span>
          </div>

          <h2 className="text-xl font-bold tracking-tight text-white leading-tight">
            Shop today, Pay later <br />
            <span className="text-purple-200">using mutual funds.</span>
          </h2>

          <p className="mt-2 text-[12.5px] leading-snug text-purple-100 max-w-[32ch]">
            Enjoy 0% interest EMIs while your mutual funds continue compounding and growing.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 border-t border-white/15 text-[10.5px]">
            <div className="flex items-center gap-1 text-white/90">
              <ShieldCheck className="h-3.5 w-3.5 text-green-300" />
              <span>No CIBIL Check</span>
            </div>
            <span className="text-white/40">•</span>
            <div className="flex items-center gap-1 text-white/90">
              <TrendingUp className="h-3.5 w-3.5 text-purple-200" />
              <span>Retain MF Returns</span>
            </div>
            <span className="text-white/40">•</span>
            <div className="flex items-center gap-1 text-white/90">
              <span className="font-bold text-yellow-300">0%</span>
              <span>No-cost EMI</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
