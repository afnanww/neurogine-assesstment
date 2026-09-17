import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          statusBarTranslucent: true,
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTintColor: '#000000',
          headerTitleStyle: {
            fontWeight: '700',
            color: '#000000',
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
