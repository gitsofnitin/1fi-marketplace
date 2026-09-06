import { useState, useEffect, useCallback } from 'react';
import type { Product, ProductCategory } from '../types/product';
import { api } from '../services/api';

export function useProducts(initialCategory: ProductCategory = 'All') {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategoryState] = useState<ProductCategory>(initialCategory);
  const [searchQuery, setSearchQueryState] = useState<string>('');
  const [reloadKey, setReloadKey] = useState<number>(0);

  const setSelectedCategory = useCallback((category: ProductCategory) => {
    setSelectedCategoryState(category);
    setLoading(true);
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setSearchQueryState(query);
    setLoading(true);
  }, []);

  const retry = useCallback(() => {
    setLoading(true);
    setReloadKey((k) => k + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    api.fetchProducts({
      category: selectedCategory,
      query: searchQuery,
    })
      .then((data) => {
        if (!cancelled) {
          setProducts(data);
          setError(null);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : 'Failed to load products. Please try again.';
          setError(message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [selectedCategory, searchQuery, reloadKey]);

  return {
    products,
    loading,
    error,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    retry,
  };
}
