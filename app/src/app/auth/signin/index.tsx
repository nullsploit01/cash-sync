import { useAuth, useOAuth } from '@clerk/clerk-expo'
import { LogIn } from '@tamagui/lucide-icons'
import { router, Stack, useFocusEffect, useLocalSearchParams } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import React from 'react'
import { View } from 'tamagui'

import PressableText from 'src/components/atoms/pressable-text'
import Layout from 'src/components/layout'
import { Routes } from 'src/constants/routes'
import useWarmUpBrowser from 'src/hooks/use-warmup-browser'
import { tokenService } from 'src/services/token'

WebBrowser.maybeCompleteAuthSession()

const SignInWithOAuth = () => {
  useWarmUpBrowser()

  const { userId, sessionId, signOut } = useAuth()
  const { signOutSession } = useLocalSearchParams()

  useFocusEffect(() => {
    if (userId || sessionId) {
      router.replace(Routes.HomePage.link)
    }

    if (signOutSession) {
      tokenService.clearToken()
      signOut()
    }
  })

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onSigninPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow()

      if (createdSessionId) {
        setActive({ session: createdSessionId })
      }
    } catch (err) {}
  }, [])

  return (
    <Layout>
      <Stack.Screen options={{ headerTitle: 'Sign In', headerRight: null }} />
      <View height={500} justifyContent="center" alignItems="center">
        <PressableText
          borderColor="black"
          borderWidth="$0.75"
          paddingHorizontal="$2"
          paddingVertical="$1.5"
          borderRadius="$3"
          startIcon={<LogIn />}
          onPress={onSigninPress}
        >
          Signin
        </PressableText>
      </View>
    </Layout>
  )
}
export default SignInWithOAuth
