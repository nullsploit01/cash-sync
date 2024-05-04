import { ClerkLoaded, ClerkLoading, ClerkProvider } from '@clerk/clerk-expo'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { useEffect } from 'react'
import { TamaguiProvider, Text } from 'tamagui'
import tamaguiConfig from 'tamagui.config'

import { Environment } from 'src/config/environment'
import { tokenService } from 'src/services/token'

const Root = () => {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf')
  })

  useEffect(() => {
    if (loaded) {
      // hide splash screen here
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <ClerkProvider publishableKey={Environment.CLERK_PUBLISHABLE_KEY} tokenCache={tokenService}>
      <TamaguiProvider config={tamaguiConfig}>
        <ClerkLoading>
          <Text>Loading..</Text>
        </ClerkLoading>
        <ClerkLoaded>
          <Stack screenOptions={{ headerTitleStyle: { fontWeight: '500' } }} />
        </ClerkLoaded>
      </TamaguiProvider>
    </ClerkProvider>
  )
}

export default Root
