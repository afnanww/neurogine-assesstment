import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface ErrorViewProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  onBack?: () => void;
  backLabel?: string;
}

export default function ErrorView({ title = 'Something went wrong',
  message,
  onRetry,
  retryLabel = 'Try Again',
  onBack,
  backLabel = 'Go Back',
}: ErrorViewProps) {
  return (
    <View style={[styles.container]}>
      <View style={styles.iconCircle}>
        <Ionicons name="alert-circle-outline" size={44} />
      </View>

      <Text style={styles.title}>{title}</Text>

      {message ? <Text style={styles.message}>{message}</Text> : null}

      <View style={styles.buttonGroup}>
        {onRetry && (
          <Pressable style={styles.primaryButton} onPress={onRetry}>
            <Ionicons name="refresh-outline" size={16} color="#FFFFFF" style={styles.btnIcon} />
            <Text style={styles.primaryButtonText}>{retryLabel}</Text>
          </Pressable>
        )}

        {onBack && (
          <Pressable style={styles.secondaryButton} onPress={onBack}>
            <Ionicons name="arrow-back-outline" size={16} style={styles.btnIcon} />
            <Text style={styles.secondaryButtonText}>{backLabel}</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 40,
    backgroundColor: '#FFFFFF',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 320,
    marginBottom: 24,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 8,
    minWidth: 110,
  },
  btnIcon: {
    marginRight: 6,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
