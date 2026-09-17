/**
 * Product Data Models
 */
export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    stock: number;
    thumbnail: string;
    images: string[];
}
/**
 * Api Contracts
 */
export interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}
export interface FetchProductsParams {
    limit?: number;
    skip?: number;
}
