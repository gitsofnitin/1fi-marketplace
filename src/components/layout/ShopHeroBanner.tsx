import React from 'react';
import { ShieldCheck, Zap, TrendingUp } from 'lucide-react';

export const ShopHeroBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#712CDC] via-[#8c27fc] to-[#5c22a5] p-5 text-white shadow-[0_8px_24px_rgba(113,44,220,0.2)]">
      {/* Background Graphic Accents */}
      <div className="absolute -right-6 -top-6 h-36 w-36 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute -left-6 -bottom-6 h-36 w-36 rounded-full bg-black/10 blur-2xl pointer-events-none" />

      {/* Pill Badge */}
      <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-white mb-3">
        <Zap className="h-3 w-3 fill-yellow-300 text-yellow-300" />
        <span>India's 1st LAMF Shopping</span>
      </div>

      {/* Heading */}
      <h2 className="text-xl font-bold tracking-tight text-white leading-tight">
        Shop today, Pay later <br />
        <span className="text-purple-200">using mutual funds.</span>
      </h2>

      <p className="mt-2 text-[12.5px] leading-snug text-purple-100 max-w-[32ch]">
        Enjoy 0% interest EMIs while your mutual funds continue compounding and growing.
      </p>

      {/* Feature Badges */}
      <div className="mt-4 flex flex-wrap items-center gap-2 pt-1 border-t border-white/15">
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
