import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Product } from '../types/products';

export interface ProductCardProps {
    product: Product;
    onPress: (product: Product) => void;
}
export default function ProductCard({ product, onPress }: ProductCardProps) {

    return (
        <Pressable onPress={() => onPress(product)} style={styles.card}
            accessibilityLabel={product.title}
            accessibilityRole="button"
        >
            {/* Product Thumbnail image */}
            <View style={styles.imageContainer}>
                {product.thumbnail ? (
                    <Image source={{ uri: product.thumbnail }} style={styles.thumbnail} resizeMode="contain"
                    />
                ) : (
                    <View style={styles.imagePlaceholder}>
                        <Text style={styles.imagePlaceholderText}>No Image</Text>
                    </View>
                )}
            </View>

            {/*Product info*/}
            <View style={styles.infoContainer}>
                {/*Title*/}
                <Text style={styles.title} numberOfLines={2}>
                    {product.title}
                </Text>
                {/*Price*/}
                <View style={styles.priceRow}>
                    <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                </View>

                {/* Rating and Stock Row */}
                <View style={styles.footerRow}>
                    {/*Rating*/}
                    <View style={styles.ratingBox}>
                        <Text style={styles.ratingStar}>★</Text>
                        <Text style={styles.ratingNumber}>
                            {product.rating.toFixed(1)}
                        </Text>
                    </View>
                    {/*Stock*/}
                    <Text style={styles.stockCount}>
                        {product.stock ?? 0} left
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}
const styles = StyleSheet.create({
    card: {
        flex: 1,
        borderRadius: 8,
        margin: 4,
        overflow: 'hidden',
        borderWidth: 1,
        borderBottomWidth: 2,
        maxWidth: '49%',
    },
    imageContainer: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    thumbnail: {
        width: '90%',
        height: '90%',
    },
    imagePlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePlaceholderText: {
        fontSize: 11,
    },
    infoContainer: {
        padding: 10,
        justifyContent: 'space-between',
        minHeight: 88,
    },
    title: {
        fontSize: 13,
        fontWeight: '500',
        lineHeight: 18,
        marginBottom: 6,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 6,
    },
    price: {
        fontSize: 17,
        fontWeight: '800',
    },
    footerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 4,
        borderTopWidth: 0.5,
        borderTopColor: '#F0F0F0',
    },
    ratingBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingStar: {
        fontSize: 11,
        marginRight: 2,
    },
    ratingNumber: {
        fontSize: 11,
        fontWeight: '600',
    },
    stockCount: {
        fontSize: 10.5,
    },
});
