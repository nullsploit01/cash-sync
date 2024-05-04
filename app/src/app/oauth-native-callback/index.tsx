import { Redirect, Stack } from 'expo-router'
import { View } from 'tamagui'

import { Routes } from 'src/constants/routes'

const OauthCallback = () => {
  return (
    <View>
      <Stack.Screen options={{ headerTitle: 'Redirecting..' }} />
      <Redirect href={Routes.HomePage.link} />
    </View>
  )
}

export default OauthCallback
