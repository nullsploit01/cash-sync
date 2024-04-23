import { TamaguiProvider, View } from '@tamagui/core';
import { Button } from 'tamagui';

import { tamaguiConfig } from './tamagui.config';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

export default function App() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      // hide splash screen here
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <View backgroundColor='red' />
      <Button>asas</Button>
    </TamaguiProvider>
  );
}
