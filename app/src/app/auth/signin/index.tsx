import { useAuth, useOAuth } from '@clerk/clerk-expo'
import { router, Stack, useFocusEffect } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import React from 'react'
import { Button } from 'react-native'

import Layout from 'src/components/layout'
import { Routes } from 'src/constants/routes'
import useWarmUpBrowser from 'src/hooks/use-warmup-browser'

WebBrowser.maybeCompleteAuthSession()

const SignInWithOAuth = () => {
  useWarmUpBrowser()
  const { userId, sessionId } = useAuth()

  useFocusEffect(() => {
    if (userId || sessionId) {
      router.replace(Routes.HomePage.link)
    }
  })

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = React.useCallback(async () => {
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
      <Button title="Sign in with Google" onPress={onPress} />
    </Layout>
  )
}
export default SignInWithOAuth
