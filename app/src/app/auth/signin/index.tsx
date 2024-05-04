import { useOAuth } from '@clerk/clerk-expo'
import * as WebBrowser from 'expo-web-browser'
import React from 'react'
import { Button } from 'react-native'

import useWarmUpBrowser from 'src/hooks/use-warmup-browser'

WebBrowser.maybeCompleteAuthSession()

const SignInWithOAuth = () => {
  useWarmUpBrowser()

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow()

      if (createdSessionId) {
        setActive({ session: createdSessionId })
      }
    } catch (err) {}
  }, [])

  return <Button title="Sign in with Google" onPress={onPress} />
}
export default SignInWithOAuth
