export interface EMIPlan {
  id: string;
  tenureMonths: number;
  monthlyEmi: number;
  interestRate: number; // percentage p.a. (0 for no-cost EMI)
  isNoCost: boolean;
  tag?: string; // e.g., "0% Interest", "Most Popular", "Lowest EMI"
  processingFee: number;
  totalInterest: number;
  totalPayable: number;
  requiredCollateral: number; // Estimated mutual fund portfolio value required to pledge
}

export interface LoanApplicationSummary {
  orderId: string;
  productId: string;
  productName: string;
  variantName: string;
  variantColor: string;
  productImage: string;
  productPrice: number;
  selectedPlan: EMIPlan;
  pledgeProvider: 'CAMS' | 'KFintech' | 'MFCentral';
  timestamp: string;
  status: 'APPROVED' | 'PLEDGED' | 'COMPLETED';
}
