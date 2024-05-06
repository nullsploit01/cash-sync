import { useAuth } from '@clerk/clerk-expo'
import { ChevronRight, CircleUserRound, LogOut } from '@tamagui/lucide-icons'
import { router, Stack } from 'expo-router'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Text, View, XStack, YStack } from 'tamagui'

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
      <TouchableOpacity onPress={() => router.navigate({ pathname: Routes.ProfilePage.link })}>
        <XStack
          padding="$3"
          alignItems="center"
          justifyContent="space-between"
          backgroundColor="$gray2"
          marginBottom="$3"
        >
          <XStack alignItems="center">
            <CircleUserRound />
            <YStack marginHorizontal="$3">
              <Text fontWeight="$10" fontSize="$6">
                Your Profile
              </Text>
              <Text theme="alt1" marginLeft="$0.5">
                Name, Email
              </Text>
            </YStack>
          </XStack>
          <ChevronRight />
        </XStack>
      </TouchableOpacity>
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
