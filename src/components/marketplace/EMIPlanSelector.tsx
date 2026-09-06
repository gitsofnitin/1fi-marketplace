import React from 'react';
import type { EMIPlan } from '../../types/emi';
import { EMIPlanCard } from './EMIPlanCard';
import { TrendingUp, ShieldCheck } from 'lucide-react';

interface EMIPlanSelectorProps {
  plans: EMIPlan[];
  selectedPlan: EMIPlan | null;
  onSelectPlan: (plan: EMIPlan) => void;
  productPrice: number;
}

export const EMIPlanSelector: React.FC<EMIPlanSelectorProps> = ({
  plans,
  selectedPlan,
  onSelectPlan,
  productPrice,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[16px] font-bold tracking-tight text-gray-900">
            Choose EMI Plan
          </h3>
          <p className="text-xs text-gray-500">
            Zero down payment • Repay in flexible monthly installments
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-200">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Instant Approval</span>
        </div>
      </div>

      {/* List of EMI Plan options */}
      <div className="flex flex-col gap-2.5" role="radiogroup" aria-label="EMI Plans">
        {plans.map((plan) => (
          <EMIPlanCard
            key={plan.id}
            plan={plan}
            isSelected={selectedPlan?.id === plan.id}
            onSelect={() => onSelectPlan(plan)}
          />
        ))}
      </div>

      {/* Detailed Loan & Collateral Breakdown */}
      {selectedPlan && (
        <div className="rounded-2xl border border-purple-100 bg-[#fbf9ff] p-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-purple-100 pb-2.5 mb-2.5">
            <span className="text-xs font-bold text-gray-900">Loan & Collateral Summary</span>
            <span className="text-[11px] font-semibold text-[#712CDC]">
              {selectedPlan.tenureMonths} Months Plan
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Device Price:</span>
              <span className="font-semibold text-gray-900">
                ₹{productPrice.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Total Interest ({selectedPlan.interestRate}% p.a.):</span>
              <span className={`font-semibold ${selectedPlan.isNoCost ? 'text-emerald-600' : 'text-gray-900'}`}>
                {selectedPlan.isNoCost ? '₹0 (Zero Interest)' : `+₹${selectedPlan.totalInterest.toLocaleString('en-IN')}`}
              </span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Processing & Foreclosure Fee:</span>
              <span className="font-semibold text-emerald-600">₹0 (Free)</span>
            </div>

            <div className="flex justify-between border-t border-purple-100 pt-2 text-gray-900 font-bold">
              <span>Total Repayable:</span>
              <span className="text-sm text-[#712CDC]">
                ₹{selectedPlan.totalPayable.toLocaleString('en-IN')}
              </span>
            </div>

            {/* 1Fi Unique Advantage: Mutual Fund Pledging info */}
            <div className="mt-3 rounded-xl bg-white border border-purple-100 p-2.5">
              <div className="flex items-start gap-2">
                <TrendingUp className="h-4 w-4 text-[#712CDC] shrink-0 mt-0.5" />
                <div className="text-[11px] text-gray-600 leading-relaxed">
                  <span className="font-bold text-gray-900">
                    MF Units to Pledge: ₹{selectedPlan.requiredCollateral.toLocaleString('en-IN')}
                  </span>
                  <p className="text-gray-500 mt-0.5">
                    Your investments continue to generate market returns while you pay regular monthly EMIs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
