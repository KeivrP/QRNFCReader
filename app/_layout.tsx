/* eslint-disable @typescript-eslint/no-require-imports */
import 'react-native-reanimated'
import 'react-native-gesture-handler'
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { Slot } from 'expo-router';
import { useEffect } from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Toast from 'react-native-toast-message';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '@/components/AuthContext';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/components/i18n';
export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
 
  /*   const colorScheme = useColorScheme(); */
  const [loaded, error] = useFonts({
    "Poppins-Light": require('../assets/fonts/Poppins-Light.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded && !error) {
    return null;
  }

  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
            <I18nextProvider i18n={i18n}>

        <SafeAreaProvider>
          <BottomSheetModalProvider>
            <AuthProvider>
              
                <ThemeProvider value={DefaultTheme}>
                  <Slot />
                  <Toast />
                </ThemeProvider>

            </AuthProvider>
          </BottomSheetModalProvider>
        </SafeAreaProvider>
        </I18nextProvider>
      </GestureHandlerRootView>
  )
}
