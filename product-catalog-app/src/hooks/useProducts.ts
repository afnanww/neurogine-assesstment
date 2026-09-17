import { useState, useEffect } from 'react';
import { fetchProducts } from '../api/productsApi';
import { Product } from '../types/products';

export interface UseProductsResult {
    products: Product[];
}
/**
 * Fetch products list from productsApi on mount.
 */
export function useProducts(): UseProductsResult {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        let isMounted = true;
        async function load() {
            try {
                const data = await fetchProducts({ limit: 20, skip: 0 });
                if (isMounted) {
                    setProducts(data.products || []);
                }
            } catch (err) {
                console.error('[useProducts]:Failed to load product', err);
            }
        }
        load();
        return () => {
            isMounted = false;
        };
    }, []);

    return { products };
}
