import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

export interface LoadingViewProps {
    message?: string;

}

export default function LoadingView({
    message = 'Loading...'
}: LoadingViewProps) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color='black' />
            {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#FFFFFF',
    },
    message: {
        marginTop: 14,
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    },
});
