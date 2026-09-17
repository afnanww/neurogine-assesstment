import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          statusBarTranslucent: true,
          headerStyle: {
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 18,
          },
          headerTitleAlign: 'center',
          contentStyle: {
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Catalog',
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
