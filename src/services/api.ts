import { MOCK_PRODUCTS } from '../data/mockProducts';
import type { EMIPlan, LoanApplicationSummary } from '../types/emi';
import type { Product, ProductCategory } from '../types/product';

// Flag to let evaluators test error state and retry logic
let simulateNetworkError = false;

export const api = {
  setSimulateError(value: boolean) {
    simulateNetworkError = value;
  },

  getSimulateError() {
    return simulateNetworkError;
  },

  /**
   * Fetch all products with optional category and search query filters
   */
  async fetchProducts(filters?: {
    category?: ProductCategory;
    query?: string;
  }): Promise<Product[]> {
    await new Promise((resolve) => setTimeout(resolve, 450));

    if (simulateNetworkError) {
      throw new Error('Network error: Unable to load 1Fi Marketplace catalog. Please check your connection and retry.');
    }

    let results = [...MOCK_PRODUCTS];

    if (filters?.category && filters.category !== 'All') {
      results = results.filter((p) => p.category === filters.category);
    }

    if (filters?.query && filters.query.trim()) {
      const q = filters.query.trim().toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.tagline && p.tagline.toLowerCase().includes(q))
      );
    }

    return results;
  },

  /**
   * Fetch a single product by its unique ID
   */
  async fetchProductById(id: string): Promise<Product> {
    await new Promise((resolve) => setTimeout(resolve, 350));

    if (simulateNetworkError) {
      throw new Error(`Failed to load product details for ${id}. Please retry.`);
    }

    const product = MOCK_PRODUCTS.find((p) => p.id === id);
    if (!product) {
      throw new Error(`Product with ID "${id}" not found.`);
    }

    return product;
  },

  /**
   * Dynamically calculate 1Fi Loan-Against-Mutual-Funds (LAMF) EMI Plans
   * - 3 & 6 Months: 0% Interest (No-Cost EMI)
   * - 9, 12, 18, 24 Months: 8% p.a. (1Fi standard low interest rate)
   * - Required Collateral: 2.0x of product value (50% LTV on equity mutual funds)
   */
  calculateEmiPlans(price: number): EMIPlan[] {
    const tenures = [
      { tenure: 3, rate: 0, isNoCost: true, tag: '0% Interest' },
      { tenure: 6, rate: 0, isNoCost: true, tag: '0% Interest' },
      { tenure: 9, rate: 8, isNoCost: false, tag: undefined },
      { tenure: 12, rate: 8, isNoCost: false, tag: 'Most Popular' },
      { tenure: 18, rate: 8, isNoCost: false, tag: 'Flexible Tenure' },
      { tenure: 24, rate: 8, isNoCost: false, tag: 'Lowest EMI' },
    ];

    return tenures.map((t) => {
      let monthlyEmi = 0;
      let totalInterest = 0;
      let totalPayable = price;

      if (t.rate === 0) {
        // No cost EMI
        monthlyEmi = Math.round(price / t.tenure);
        totalInterest = 0;
        totalPayable = price;
      } else {
        // Reducing balance EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
        const monthlyRate = t.rate / 12 / 100;
        const numerator = price * monthlyRate * Math.pow(1 + monthlyRate, t.tenure);
        const denominator = Math.pow(1 + monthlyRate, t.tenure) - 1;
        monthlyEmi = Math.round(numerator / denominator);
        totalPayable = monthlyEmi * t.tenure;
        totalInterest = totalPayable - price;
      }

      // 50% LTV means user needs 2x the loan amount in MF portfolio
      const requiredCollateral = Math.round(price * 2);

      return {
        id: `emi-${t.tenure}m`,
        tenureMonths: t.tenure,
        monthlyEmi,
        interestRate: t.rate,
        isNoCost: t.isNoCost,
        tag: t.tag,
        processingFee: 0, // 1Fi offers zero processing fee
        totalInterest,
        totalPayable,
        requiredCollateral,
      };
    });
  },

  /**
   * Submit loan / pledge verification application
   */
  async submitLoanApplication(payload: Omit<LoanApplicationSummary, 'orderId' | 'timestamp' | 'status'>): Promise<LoanApplicationSummary> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const orderId = '1FI-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    const result: LoanApplicationSummary = {
      ...payload,
      orderId,
      timestamp: new Date().toISOString(),
      status: 'APPROVED',
    };

    // Store in session storage matching 1Fi pattern
    try {
      const history = JSON.parse(sessionStorage.getItem('1fi_loan_orders') || '[]');
      history.unshift(result);
      sessionStorage.setItem('1fi_loan_orders', JSON.stringify(history));
    } catch {
      // Ignore if in SSR or restricted storage
    }

    return result;
  },
};
