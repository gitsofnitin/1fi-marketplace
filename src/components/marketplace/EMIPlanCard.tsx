import React from 'react';
import type { EMIPlan } from '../../types/emi';
import { Check, Sparkles } from 'lucide-react';

interface EMIPlanCardProps {
  plan: EMIPlan;
  isSelected: boolean;
  onSelect: () => void;
}

export const EMIPlanCard: React.FC<EMIPlanCardProps> = ({
  plan,
  isSelected,
  onSelect,
}) => {
  const formattedMonthlyEmi = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(plan.monthlyEmi);

  return (
    <div
      onClick={onSelect}
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`relative flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer select-none active:scale-[0.99] ${
        isSelected
          ? 'border-[#712CDC] bg-gradient-to-r from-[#f7f2ff] to-white shadow-[0_2px_12px_rgba(113,44,220,0.12)] ring-1 ring-[#712CDC]'
          : 'border-zinc-200 bg-white hover:border-zinc-300 hover:bg-gray-50/50'
      }`}
    >
      {/* Left: Radio & Tenure */}
      <div className="flex items-center gap-3">
        {/* Custom Radio Button */}
        <div
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all ${
            isSelected
              ? 'border-[#712CDC] bg-[#712CDC] text-white shadow-xs'
              : 'border-zinc-300 bg-white'
          }`}
        >
          {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-[14.5px] font-bold text-gray-900">
              {plan.tenureMonths} Months
            </span>
            {plan.tag && (
              <span
                className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wider ${
                  plan.isNoCost
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-purple-100 text-[#712CDC]'
                }`}
              >
                {plan.isNoCost && <Sparkles className="h-2.5 w-2.5 fill-emerald-600" />}
                <span>{plan.tag}</span>
              </span>
            )}
          </div>

          <p className="mt-0.5 text-[11px] text-gray-500">
            {plan.isNoCost ? (
              <span className="font-semibold text-emerald-700">No interest charges</span>
            ) : (
              <span>Interest @ {plan.interestRate}% p.a. (LAMF)</span>
            )}
          </p>
        </div>
      </div>

      {/* Right: Monthly Installment */}
      <div className="text-right">
        <div className="text-[15.5px] font-extrabold text-gray-900">
          {formattedMonthlyEmi}
          <span className="text-xs font-normal text-gray-500">/mo</span>
        </div>
        <p className="text-[10px] text-gray-400">
          Total: ₹{plan.totalPayable.toLocaleString('en-IN')}
        </p>
      </div>
    </div>
  );
};
