import { useState, useEffect, useCallback } from 'react';
import type { Product, ProductCategory } from '../types/product';
import { api } from '../services/api';

export function useProducts(initialCategory: ProductCategory = 'All') {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.fetchProducts({
        category: selectedCategory,
        query: searchQuery,
      });
      setProducts(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return {
    products,
    loading,
    error,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    retry: loadProducts,
  };
}
