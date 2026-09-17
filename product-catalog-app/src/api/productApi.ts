/**
 * Product API
 * connection with DummyJSON API
 */
import { Product, ProductsResponse, FetchProductsParams } from '../types/products';
const BASE_URL = 'https://dummyjson.com/products';

/**
 * Fetch product in a paginated list of products.
 * with LIMIT Number of items to fetch (default: 20) and SKIP Offset for pagination
 */
export async function fetchProducts({ limit = 20, skip = 0 }: FetchProductsParams = {}): Promise<ProductsResponse> {
    try {
        const url = `${BASE_URL}?limit=${limit}&skip=${skip}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('[productsApi.fetchProducts Error]:', error);
        throw error;
    }
}