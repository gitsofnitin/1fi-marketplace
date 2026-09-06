import React, { useState } from 'react';
import type { Product, ProductVariant } from '../../types/product';
import type { EMIPlan, LoanApplicationSummary } from '../../types/emi';
import { api } from '../../services/api';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Loader2, Landmark } from 'lucide-react';

interface OrderSummarySheetProps {
  product: Product;
  variant: ProductVariant;
  selectedPlan: EMIPlan;
  onClose: () => void;
  onSuccess: (summary: LoanApplicationSummary) => void;
}

export const OrderSummarySheet: React.FC<OrderSummarySheetProps> = ({
  product,
  variant,
  selectedPlan,
  onClose,
  onSuccess,
}) => {
  const [provider, setProvider] = useState<'CAMS' | 'KFintech' | 'MFCentral'>('CAMS');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<LoanApplicationSummary | null>(null);

  const handleConfirmLoan = async () => {
    setIsSubmitting(true);
    try {
      const summary = await api.submitLoanApplication({
        productId: product.id,
        productName: product.name,
        variantName: variant.name,
        variantColor: variant.color,
        productImage: variant.image || product.images[0],
        productPrice: variant.price,
        selectedPlan,
        pledgeProvider: provider,
      });

      setCompletedOrder(summary);
      onSuccess(summary);
    } catch (err) {
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formattedMonthlyEmi = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(selectedPlan.monthlyEmi);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
      <div
        className="relative w-full max-w-[480px] rounded-t-[32px] sm:rounded-[32px] bg-white p-5 pb-8 shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto no-scrollbar"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {completedOrder ? (
          /* SUCCESS STATE */
          <div className="flex flex-col items-center text-center py-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4 animate-bounce">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-[#712CDC] border border-purple-100">
              Loan Approved Instantly
            </span>

            <h3 className="mt-3 text-2xl font-black tracking-tight text-gray-900">
              Order Confirmed!
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              Order ID: <span className="font-mono font-bold text-gray-800">{completedOrder.orderId}</span>
            </p>

            <div className="mt-6 w-full rounded-2xl border border-gray-100 bg-gray-50/80 p-4 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Item:</span>
                <span className="font-bold text-gray-900">{product.name} ({variant.name})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Monthly EMI:</span>
                <span className="font-bold text-[#712CDC]">{formattedMonthlyEmi} / month</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tenure:</span>
                <span className="font-bold text-gray-900">{selectedPlan.tenureMonths} Months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Pledge Provider:</span>
                <span className="font-bold text-gray-900">{completedOrder.pledgeProvider}</span>
              </div>
            </div>

            <p className="mt-4 text-[11px] text-gray-500 max-w-[34ch] leading-relaxed">
              Your device will be dispatched for shipping. Mutual fund units remain safely pledged with 1Fi lending partners.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-xl bg-[#712CDC] py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#5b24b5] transition-colors"
            >
              Back to Marketplace
            </button>
          </div>
        ) : (
          /* SUMMARY & CONFIRMATION */
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#712CDC] mb-1">
                <ShieldCheck className="h-4 w-4" />
                <span>1Fi Affordable Checkout</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-gray-900">
                Review EMI Application
              </h3>
            </div>

            {/* Product Card Snippet */}
            <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-3">
              <img
                src={variant.image || product.images[0]}
                alt={product.name}
                className="h-14 w-14 rounded-xl object-contain bg-white p-1 border border-gray-100"
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-gray-900 truncate">
                  {product.name}
                </h4>
                <p className="text-xs text-gray-500">
                  {variant.name} • {variant.color}
                </p>
                <p className="text-xs font-extrabold text-[#712CDC] mt-0.5">
                  ₹{variant.price.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            {/* Selected Plan Details */}
            <div className="rounded-2xl border border-purple-100 bg-[#fbf9ff] p-3.5 space-y-2 text-xs">
              <div className="flex justify-between items-center font-bold text-gray-900">
                <span>Selected Plan:</span>
                <span className="text-[#712CDC] text-sm">
                  {formattedMonthlyEmi} × {selectedPlan.tenureMonths} mo
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Interest:</span>
                <span className={selectedPlan.isNoCost ? 'text-emerald-600 font-semibold' : ''}>
                  {selectedPlan.isNoCost ? '0% (No Cost)' : `${selectedPlan.interestRate}% p.a.`}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Down Payment:</span>
                <span className="font-semibold text-emerald-600">₹0 (Zero)</span>
              </div>
            </div>

            {/* Pledging Verification Option */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-2">
                Pledge Mutual Funds Via:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['CAMS', 'KFintech', 'MFCentral'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setProvider(p)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-bold transition-all ${
                      provider === p
                        ? 'border-[#712CDC] bg-[#f5f0ff] text-[#712CDC] shadow-xs ring-1 ring-[#712CDC]'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <Landmark className="h-4 w-4 mb-1" />
                    <span>{p}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Trust Callout */}
            <div className="flex items-center gap-2 rounded-xl bg-purple-50/60 p-2.5 text-[11px] text-gray-600">
              <ShieldCheck className="h-4 w-4 text-[#712CDC] shrink-0" />
              <span>Digital OTP consent. Units remain in your demat/folio.</span>
            </div>

            {/* Action CTA */}
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleConfirmLoan}
              className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-[#712CDC] py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#5b24b5] transition-all active:scale-[0.99] disabled:opacity-70 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Verifying Pledge & Approving...</span>
                </>
              ) : (
                <>
                  <span>Confirm & Apply Loan ({formattedMonthlyEmi}/mo)</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
