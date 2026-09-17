import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchProducts } from '../api/productsApi';
import { Product } from '../types/products';

export interface UseProductsResult {
    products: Product[];
    loading: boolean;
    loadingMore: boolean;
    hasMore: boolean;
    total: number;
    loadMore: () => void;
}

/**
 * Fetch products list from productsApi on mount with pagination support.
 */
export function useProducts(): UseProductsResult {
    const [products, setProducts] = useState<Product[]>([]);

    //load more
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0);

    //refs to prevent duplicate calls and stale closures during fast scrolling
    const skipRef = useRef<number>(0);
    const totalRef = useRef<number>(0);
    const isFetchingRef = useRef<boolean>(false);
    const productsLengthRef = useRef<number>(0);

    //initial load
    useEffect(() => {
        let isMounted = true;

        async function loadInitial() {
            setLoading(true);
            try {
                const data = await fetchProducts({ limit: 20, skip: 0 });
                if (!isMounted) return;

                const items = data.products || [];
                setProducts(items);
                productsLengthRef.current = items.length;

                const totalItems = data.total || 0;
                setTotal(totalItems);
                totalRef.current = totalItems;
                skipRef.current = items.length;
            } catch (err) {
                console.error('[useProducts]: Failed to load products', err);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
                isFetchingRef.current = false;
            }
        }

        loadInitial();

        return () => {
            isMounted = false;
            isFetchingRef.current = false;
        };
    }, []);

    // Load more function for infinite scroll
    const loadMore = useCallback(async () => {
        // Stop if already fetching or if we reached the total items
        if (
            isFetchingRef.current ||
            loading ||
            loadingMore ||
            (totalRef.current > 0 && productsLengthRef.current >= totalRef.current)
        ) {
            return;
        }

        isFetchingRef.current = true;
        setLoadingMore(true);

        try {
            const nextSkip = skipRef.current;
            const data = await fetchProducts({ limit: 20, skip: nextSkip });
            const newItems = data.products || [];

            if (newItems.length > 0) {
                setProducts((prev) => {
                    const existingIds = new Set(prev.map((item) => item.id));
                    const filtered = newItems.filter((item) => !existingIds.has(item.id));
                    const updated = [...prev, ...filtered];
                    productsLengthRef.current = updated.length;
                    return updated;
                });
                skipRef.current = nextSkip + newItems.length;
            }

            if (data.total !== undefined) {
                setTotal(data.total);
                totalRef.current = data.total;
            }
        } catch (err) {
            console.warn('[useProducts.loadMore Error]:', err);
        } finally {
            setLoadingMore(false);
            isFetchingRef.current = false;
        }
    }, [loading, loadingMore]);

    const hasMore = total === 0 || products.length < total;

    return { products, loading, loadingMore, hasMore, total, loadMore };
}
