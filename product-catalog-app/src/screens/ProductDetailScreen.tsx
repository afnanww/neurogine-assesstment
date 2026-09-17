import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { fetchProductById } from '../api/productsApi';
import { Product } from '../types/products';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import EmptyView from '../components/EmptyView';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ProductDetailScreenProps {
    productId: number | string;
    onBack?: () => void;
}

export default function ProductDetailScreen({ productId, onBack }: ProductDetailScreenProps) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const loadDetail = useCallback(async () => {
        if (!productId) return;
        try {
            setLoading(true);
            setError(null);
            const data = await fetchProductById(productId);
            setProduct(data);
        } catch (err: any) {
            setError(err?.message || 'Failed to load product details.');
        } finally {
            setLoading(false);
        }
    }, [productId]);

    useEffect(() => {
        loadDetail();
    }, [loadDetail]);

    if (loading) {
        return <LoadingView message="Loading details..." />;
    }

    if (error) {
        return (
            <ErrorView
                title="Error Loading Details"
                message={error}
                onRetry={loadDetail}
                onBack={onBack}
            />
        );
    }

    if (!product) {
        return (
            <EmptyView
                title="Product Not Found"
                message="The product you are looking for does not exist."
                actionLabel="Go Back"
                onAction={onBack}
            />
        );
    }

    const images = product.images?.length ? product.images : [product.thumbnail];

    const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const slide = Math.round(
            e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width
        );
        if (slide !== activeImageIndex && slide >= 0 && slide < images.length) {
            setActiveImageIndex(slide);
        }
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Horizontal Image Gallery */}
            <View style={styles.gallery}>
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={handleScroll}
                >
                    {images.map((uri: string, idx: number) => (
                        <View key={idx} style={styles.slide}>
                            <Image source={{ uri }} style={styles.image} resizeMode="contain" />
                        </View>
                    ))}
                </ScrollView>

                {images.length > 1 && (
                    <View style={styles.counterBadge}>
                        <Text style={styles.counterText}>
                            {activeImageIndex + 1}/{images.length}
                        </Text>
                    </View>
                )}
            </View>

            {/* Product Information */}
            <View style={styles.content}>
                {/* Price, Rating & Stock */}
                <View style={styles.metaRow}>
                    <Text style={styles.price}>${product.price.toFixed(2)}</Text>

                    <View style={styles.metaInfo}>
                        {product.rating !== undefined && (
                            <>
                                <Text style={styles.ratingText}>
                                    <Text style={styles.star}>★</Text> {product.rating.toFixed(1)}
                                </Text>
                                <Text style={styles.divider}>|</Text>
                            </>
                        )}
                        <Text style={styles.stockText}>In Stock ({product.stock} left)</Text>
                    </View>
                </View>

                {/* Title */}
                <Text style={styles.title}>{product.title}</Text>

                {/* Full Description */}
                <View style={styles.section}>
                    <Text style={styles.heading}>Description</Text>
                    <Text style={styles.description}>
                        {product.description || 'No description available.'}
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    gallery: {
        backgroundColor: '#F8FAFC',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    slide: {
        width: SCREEN_WIDTH > 600 ? 600 : SCREEN_WIDTH,
        height: 270,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '90%',
        height: '90%',
    },
    counterBadge: {
        position: 'absolute',
        bottom: 12,
        right: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        paddingHorizontal: 9,
        paddingVertical: 3,
        borderRadius: 12,
    },
    counterText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 18,
        paddingBottom: 40,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
        flexWrap: 'wrap',
        gap: 8,
    },
    price: {
        fontSize: 26,
        fontWeight: '900',
    },
    metaInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    ratingText: {
        fontSize: 13,
        fontWeight: '600',
    },
    star: {
        fontSize: 14,
    },
    divider: {
        fontSize: 13,
    },
    stockText: {
        fontSize: 13,
        fontWeight: '500',
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        lineHeight: 28,
        marginBottom: 16,
    },
    section: {
        marginTop: 8,
    },
    heading: {
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 8,
    },
    description: {
        fontSize: 14.5,
        lineHeight: 23,
    },
});
