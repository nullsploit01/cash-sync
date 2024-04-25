import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TamaguiProvider, Text } from 'tamagui';
import tamaguiConfig from 'tamagui.config';

const Root = () => {
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
    <SafeAreaView>
      <TamaguiProvider config={tamaguiConfig}>
        <Slot />
      </TamaguiProvider>
    </SafeAreaView>
  );
};

export default Root;
