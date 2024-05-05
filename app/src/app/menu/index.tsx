import { useAuth } from '@clerk/clerk-expo'
import { LogOut } from '@tamagui/lucide-icons'
import { router, Stack } from 'expo-router'
import React from 'react'
import { Text, View } from 'tamagui'

import PressableText from 'src/components/atoms/pressable-text'
import Layout from 'src/components/layout'
import { Routes } from 'src/constants/routes'
import { tokenService } from 'src/services/token'

const MenuPage = () => {
  const { signOut } = useAuth()

  const onSignoutPress = async () => {
    await tokenService.clearToken()
    await signOut()

    router.replace(Routes.SigninPage.link)
  }

  return (
    <Layout protectedRoute>
      <Stack.Screen options={{ headerTitle: 'Menu', headerRight: null }} />
      <View padding="$3" backgroundColor="$gray2">
        <PressableText startIcon={<LogOut color="red" />} onPress={onSignoutPress}>
          <Text marginLeft="$10" color="red">
            Logout
          </Text>
        </PressableText>
      </View>
    </Layout>
  )
}

export default MenuPage
