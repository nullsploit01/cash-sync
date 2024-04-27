import { useFonts } from 'expo-font'
import { Slot } from 'expo-router'
import { useEffect } from 'react'
import { TamaguiProvider } from 'tamagui'
import tamaguiConfig from 'tamagui.config'

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
    <TamaguiProvider config={tamaguiConfig}>
      <Slot />
    </TamaguiProvider>
  )
}

export default Root
