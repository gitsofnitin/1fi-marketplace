import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Product, ProductVariant } from '../types/product';
import type { EMIPlan } from '../types/emi';
import { api } from '../services/api';

export function useProductDetails(productId: string | null) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedEmiPlan, setSelectedEmiPlan] = useState<EMIPlan | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadProduct = useCallback(async () => {
    if (!productId) {
      setProduct(null);
      setSelectedVariant(null);
      setSelectedEmiPlan(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await api.fetchProductById(productId);
      setProduct(data);
      if (data.variants && data.variants.length > 0) {
        setSelectedVariant(data.variants[0]);
      }
    } catch (err: any) {
      setError(err?.message || 'Unable to load product details.');
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  // Dynamically calculate EMI plans based on active variant's price
  const currentPrice = selectedVariant ? selectedVariant.price : (product ? product.basePrice : 0);

  const emiPlans = useMemo(() => {
    if (currentPrice <= 0) return [];
    return api.calculateEmiPlans(currentPrice);
  }, [currentPrice]);

  // Keep selected EMI plan in sync with updated prices or default to 12m / 6m
  useEffect(() => {
    if (emiPlans.length > 0) {
      // Find matching tenure if previously selected, otherwise pick 12-month or 6-month
      const previousTenure = selectedEmiPlan?.tenureMonths;
      const matched = emiPlans.find((p) => p.tenureMonths === previousTenure);
      if (matched) {
        setSelectedEmiPlan(matched);
      } else {
        const defaultPlan = emiPlans.find((p) => p.tenureMonths === 12) || emiPlans[0];
        setSelectedEmiPlan(defaultPlan);
      }
    }
  }, [emiPlans]);

  return {
    product,
    selectedVariant,
    setSelectedVariant,
    emiPlans,
    selectedEmiPlan,
    setSelectedEmiPlan,
    currentPrice,
    loading,
    error,
    retry: loadProduct,
  };
}
