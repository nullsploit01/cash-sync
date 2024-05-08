import { ClerkLoaded, ClerkLoading, ClerkProvider } from '@clerk/clerk-expo'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { TamaguiProvider } from 'tamagui'
import tamaguiConfig from 'tamagui.config'

import AppMenu from 'src/components/molecules/app-menu'
import Loading from 'src/components/organisms/loading'
import { Environment } from 'src/config/environment'
import { HttpInterceptor } from 'src/services/api'
import { tokenService } from 'src/services/token'

SplashScreen.preventAutoHideAsync()

const Root = () => {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf')
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <ClerkProvider publishableKey={Environment.CLERK_PUBLISHABLE_KEY} tokenCache={tokenService}>
      <HttpInterceptor>
        <TamaguiProvider config={tamaguiConfig}>
          <ClerkLoading>
            <Loading />
          </ClerkLoading>
          <ClerkLoaded>
            <Stack
              screenOptions={{
                headerTitleStyle: { fontWeight: '500' },
                headerRight: (p) => <AppMenu />
              }}
            />
          </ClerkLoaded>
        </TamaguiProvider>
      </HttpInterceptor>
    </ClerkProvider>
  )
}

export default Root
