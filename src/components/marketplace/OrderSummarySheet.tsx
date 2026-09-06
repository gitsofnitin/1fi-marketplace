import React, { useState } from 'react';
import type { Product, ProductVariant } from '../../types/product';
import type { EMIPlan, LoanApplicationSummary } from '../../types/emi';
import { api } from '../../services/api';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Loader2,
  Landmark,
  PieChart,
  Lock,
  Sparkles,
} from 'lucide-react';

interface OrderSummarySheetProps {
  product: Product;
  variant: ProductVariant;
  selectedPlan: EMIPlan;
  onClose: () => void;
  onSuccess: (summary: LoanApplicationSummary) => void;
}

type CheckoutStep = 'REVIEW' | 'OTP_VERIFY' | 'SUCCESS';

export const OrderSummarySheet: React.FC<OrderSummarySheetProps> = ({
  product,
  variant,
  selectedPlan,
  onClose,
  onSuccess,
}) => {
  const [step, setStep] = useState<CheckoutStep>('REVIEW');
  const [provider, setProvider] = useState<'CAMS' | 'KFintech' | 'MFCentral'>('CAMS');
  const [otp, setOtp] = useState('7421');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<LoanApplicationSummary | null>(null);

  const handleProceedToOtp = () => {
    setStep('OTP_VERIFY');
  };

  const handleVerifyAndApprove = async () => {
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
      setStep('SUCCESS');
      onSuccess(summary);
    } catch {
      alert('Application failed. Please try again.');
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
        className="relative w-full max-w-[480px] rounded-t-[32px] sm:rounded-[32px] bg-white p-5 pb-8 shadow-2xl animate-slide-up max-h-[92vh] overflow-y-auto no-scrollbar"
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

        {/* ================= STEP 3: ORDER SUCCESS ================= */}
        {step === 'SUCCESS' && completedOrder && (
          <div className="flex flex-col items-center text-center py-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-3 animate-bounce">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-[#712CDC] border border-purple-100">
              Loan Approved Instantly
            </span>

            <h3 className="mt-2 text-2xl font-black tracking-tight text-gray-900">
              Order Placed Successfully!
            </h3>
            <p className="mt-0.5 text-xs text-gray-500">
              Order ID: <span className="font-mono font-bold text-gray-800">{completedOrder.orderId}</span>
            </p>

            {/* Approved Loan Details */}
            <div className="mt-5 w-full rounded-2xl border border-gray-100 bg-gray-50/90 p-4 text-left text-xs space-y-2.5">
              <div className="flex justify-between items-center border-b border-gray-200/60 pb-2">
                <span className="text-gray-500">Item:</span>
                <span className="font-bold text-gray-900 truncate max-w-[24ch]">
                  {product.name} ({variant.name})
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Monthly EMI:</span>
                <span className="font-bold text-[#712CDC] text-sm">{formattedMonthlyEmi} / mo</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Tenure:</span>
                <span className="font-semibold text-gray-900">{selectedPlan.tenureMonths} Months</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Interest Type:</span>
                <span className={`font-semibold ${selectedPlan.isNoCost ? 'text-emerald-700' : 'text-gray-900'}`}>
                  {selectedPlan.isNoCost ? '0% No-Cost EMI' : `${selectedPlan.interestRate}% p.a.`}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Pledged Collateral:</span>
                <span className="font-semibold text-gray-900">₹{selectedPlan.requiredCollateral.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Pledge Partner:</span>
                <span className="font-bold text-gray-900">{completedOrder.pledgeProvider}</span>
              </div>
            </div>

            {/* 1Fi Benefit Notice */}
            <div className="mt-4 rounded-xl bg-purple-50/70 p-3 text-[11px] text-[#712CDC] flex items-start gap-2 text-left border border-purple-100">
              <Sparkles className="h-4 w-4 shrink-0 mt-0.5" />
              <span>
                Your mutual funds remain invested and keep compounding in the market. First EMI will be debited on the 5th of next month.
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-xl bg-[#712CDC] py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#5b24b5] transition-colors"
            >
              Return to Marketplace
            </button>
          </div>
        )}

        {/* ================= STEP 2: OTP / CONSENT VERIFICATION ================= */}
        {step === 'OTP_VERIFY' && (
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#712CDC] mb-1">
                <Lock className="h-4 w-4" />
                <span>Depository Authorization</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-gray-900">
                Authorize Mutual Fund Pledge
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Enter the OTP sent to your Aadhaar & PAN linked mobile number (+91 98****3210) for {provider}.
              </p>
            </div>

            {/* Mock OTP Input */}
            <div className="my-2 rounded-2xl border border-purple-100 bg-purple-50/30 p-4 text-center">
              <label className="block text-xs font-semibold text-gray-600 mb-2">
                4-Digit Depository Consent OTP
              </label>
              <input
                type="text"
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="h-12 w-44 mx-auto rounded-xl border border-gray-300 bg-white text-center text-2xl font-mono font-bold tracking-[0.3em] text-gray-900 shadow-xs focus:border-[#712CDC] focus:ring-2 focus:ring-purple-100 outline-none"
              />
              <p className="mt-2 text-[10.5px] text-gray-400">
                (Demo Test OTP: 7421 already entered)
              </p>
            </div>

            {/* Summary Tag */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 text-xs flex justify-between items-center">
              <span className="text-gray-500">Monthly EMI to be deducted:</span>
              <span className="font-extrabold text-[#712CDC] text-sm">{formattedMonthlyEmi}/mo</span>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              disabled={isSubmitting || otp.length < 4}
              onClick={handleVerifyAndApprove}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#712CDC] py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#5b24b5] transition-all active:scale-[0.99] disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Verifying Pledge with {provider}...</span>
                </>
              ) : (
                <>
                  <span>Verify OTP & Approve Loan</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        )}

        {/* ================= STEP 1: REVIEW ORDER & EMI ================= */}
        {step === 'REVIEW' && (
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
                  {selectedPlan.isNoCost ? '0% (No Cost EMI)' : `${selectedPlan.interestRate}% p.a.`}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Down Payment:</span>
                <span className="font-semibold text-emerald-600">₹0 (Zero Downpayment)</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Foreclosure Fee:</span>
                <span className="font-semibold text-emerald-600">₹0 (Free anytime)</span>
              </div>
            </div>

            {/* Linked Mutual Fund Holdings Simulation (1Fi Core Logic) */}
            <div className="rounded-2xl border border-gray-200/80 bg-white p-3.5 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
                  <PieChart className="h-4 w-4 text-[#712CDC]" />
                  <span>Linked Mutual Funds (Fetched)</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Verified
                </span>
              </div>

              <div className="space-y-1.5 text-[11px] text-gray-600">
                <div className="flex justify-between">
                  <span>Parag Parikh Flexi Cap Fund</span>
                  <span className="font-semibold text-gray-800">₹1,85,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Mirae Asset Large Cap Fund</span>
                  <span className="font-semibold text-gray-800">₹1,40,000</span>
                </div>
                <div className="border-t border-gray-100 pt-1.5 flex justify-between font-bold text-gray-900">
                  <span>Total Portfolio:</span>
                  <span>₹3,25,000</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Pledge Required (50% LTV):</span>
                  <span>₹{selectedPlan.requiredCollateral.toLocaleString('en-IN')} (Eligible)</span>
                </div>
              </div>
            </div>

            {/* Pledging Verification Provider */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-2">
                Select Pledge Depository Partner:
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

            {/* Action CTA */}
            <button
              type="button"
              onClick={handleProceedToOtp}
              className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-[#712CDC] py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#5b24b5] transition-all active:scale-[0.99] cursor-pointer"
            >
              <span>Proceed to Authorize Pledge</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
