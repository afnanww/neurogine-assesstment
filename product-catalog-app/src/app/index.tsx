import { StyleSheet, View } from 'react-native';
import { useProducts } from '../hooks/useProducts';
import ProductListScreen from '../screens/ProductListScreen';
import { Product } from '../types/products';
import { useRouter } from 'expo-router';

export default function CatalogScreen() {
    const router = useRouter();
    const { products, loadingMore, hasMore, total, loadMore } = useProducts();

    const handleSelectProduct = (product: Product) => {
        console.log('Selected product:', product.id);
    };

    return (
        <View style={styles.container}>
            <ProductListScreen
                products={products}
                onSelectProduct={handleSelectProduct}
                loadingMore={loadingMore}
                hasMore={hasMore}
                total={total}
                onLoadMore={loadMore}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        maxWidth: 600,
        alignSelf: 'center',
    },
});
