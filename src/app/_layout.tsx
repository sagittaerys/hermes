import { useEffect } from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { PortalProvider } from '@tamagui/portal'
import { TamaguiProvider } from 'tamagui'
import { QueryClientProvider } from '@tanstack/react-query'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_900Black } from '@expo-google-fonts/inter'
import * as SplashScreen from 'expo-splash-screen'

import { tamaguiConfig } from '../../tamagui.config'
import { queryClient } from '@shared/lib/queryClient'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    Inter_900Black,
  })

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <TamaguiProvider config={tamaguiConfig} defaultTheme="dark">
          <PortalProvider>
            <QueryClientProvider client={queryClient}>
              <StatusBar style="light" />
              <Stack screenOptions={{ headerShown: false }} />
            </QueryClientProvider>
          </PortalProvider>
        </TamaguiProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}