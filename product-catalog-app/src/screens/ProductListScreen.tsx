import { View, Text, FlatList, StyleSheet, ListRenderItemInfo } from 'react-native';
import ProductCard from '../components/ProductCard';
import { Product } from '../types/products';

export interface ProductListScreenProps {
    products?: Product[];
    onSelectProduct?: (product: Product) => void;
    //load more props
    loadingMore?: boolean;
    hasMore?: boolean;
    total?: number;
    onLoadMore?: () => void;
    //refresh props
    refreshing?: boolean;
    onRefresh?: () => void;
}
/**
 * ProductListScreen
 * Displays a 2-column product grid.
 */
export default function ProductListScreen({
    products = [],
    onSelectProduct,
    loadingMore = false,
    hasMore = false,
    total,
    onLoadMore,
    refreshing = false,
    onRefresh,

}: ProductListScreenProps) {
    //footer to load more after LIMIT
    const renderFooter = () => {
        if (loadingMore) {
            return (
                <View style={styles.footerLoader}>
                    <Text style={styles.footerEndText}>Loading more products...</Text>
                </View>
            );
        }
        //footer to show end
        if (!hasMore && products.length > 0) {
            return (
                <View style={styles.footerEnd}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.footerEndText}>
                        You've reached the end • {products.length} products
                    </Text>
                    <View style={styles.dividerLine} />
                </View>
            );
        }

        return null;
    };

    const handleEndReached = () => {
        if (hasMore && !loadingMore && onLoadMore) {
            onLoadMore();
        }
    };

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
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.3}
                ListFooterComponent={renderFooter}
                refreshing={refreshing}
                onRefresh={onRefresh}
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
        paddingBottom: 48,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        paddingHorizontal: 2,
    },
    footerLoader: {
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerEnd: {
        paddingVertical: 24,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E5EA',
    },
    footerEndText: {
        marginHorizontal: 10,
        fontSize: 12,
        color: '#8E8E93',
        fontWeight: '500',
    },
});