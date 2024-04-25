import { Avatar, XStack, TamaguiProvider, Text } from 'tamagui';
import { tamaguiConfig } from './tamagui.config';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    <SafeAreaView>
      <TamaguiProvider config={tamaguiConfig}>
        <Text>Sup Bro</Text>
      </TamaguiProvider>
    </SafeAreaView>
  );
}
