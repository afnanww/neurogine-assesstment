import { useLocalSearchParams, useRouter } from 'expo-router';
import ProductDetailScreen from '../screens/ProductDetailScreen';
export default function ProductDetailRoute() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    return (
        <ProductDetailScreen
            productId={id}
            onBack={() => router.back()}
        />
    );
}
