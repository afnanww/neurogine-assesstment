import { View, FlatList, StyleSheet, ListRenderItemInfo } from 'react-native';
import ProductCard from '../components/ProductCard';
import { Product } from '../types/products';

export interface ProductListScreenProps {
    products?: Product[];
    onSelectProduct?: (product: Product) => void;
}

/**
 * ProductListScreen
 * Displays a 2-column product grid.
 */
export default function ProductListScreen({
    products = [],
    onSelectProduct,
}: ProductListScreenProps) {
    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item: Product) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                renderItem={({ item }: ListRenderItemInfo<Product>) => (
                    <ProductCard product={item} onPress={onSelectProduct} />
                )}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: 8,
        paddingTop: 8,
        paddingBottom: 32,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        paddingHorizontal: 2,
    },
});
