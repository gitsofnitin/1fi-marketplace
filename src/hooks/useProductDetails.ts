import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Product, ProductVariant } from '../types/product';
import type { EMIPlan } from '../types/emi';
import { api } from '../services/api';

export function useProductDetails(productId: string | null) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedTenure, setSelectedTenure] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(productId));
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState<number>(0);

  const retry = useCallback(() => {
    setLoading(true);
    setReloadKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (!productId) return;

    let cancelled = false;

    api.fetchProductById(productId)
      .then((data) => {
        if (!cancelled) {
          setProduct(data);
          if (data.variants && data.variants.length > 0) {
            setSelectedVariant(data.variants[0]);
          }
          setError(null);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : 'Unable to load product details.';
          setError(message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [productId, reloadKey]);

  // Dynamically calculate EMI plans based on active variant's price
  const currentPrice = selectedVariant ? selectedVariant.price : (product ? product.basePrice : 0);

  const emiPlans = useMemo(() => {
    if (currentPrice <= 0) return [];
    return api.calculateEmiPlans(currentPrice);
  }, [currentPrice]);

  // Derive active EMI plan based on user's selected tenure (defaulting to 12 months or first available)
  const selectedEmiPlan = useMemo(() => {
    if (emiPlans.length === 0) return null;
    if (selectedTenure !== null) {
      const matched = emiPlans.find((p) => p.tenureMonths === selectedTenure);
      if (matched) return matched;
    }
    return emiPlans.find((p) => p.tenureMonths === 12) || emiPlans[0];
  }, [emiPlans, selectedTenure]);

  const setSelectedEmiPlan = useCallback((plan: EMIPlan | null) => {
    setSelectedTenure(plan ? plan.tenureMonths : null);
  }, []);

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
    retry,
  };
}
