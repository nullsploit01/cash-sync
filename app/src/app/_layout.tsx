import { ClerkProvider } from '@clerk/clerk-expo'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { useEffect } from 'react'
import { TamaguiProvider } from 'tamagui'
import tamaguiConfig from 'tamagui.config'

import { Environment } from 'src/config/environment'

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
    <ClerkProvider publishableKey={Environment.CLERK_PUBLISHABLE_KEY}>
      <TamaguiProvider config={tamaguiConfig}>
        <Stack screenOptions={{ headerTitleStyle: { fontWeight: '500' } }} />
      </TamaguiProvider>
    </ClerkProvider>
  )
}

export default Root
