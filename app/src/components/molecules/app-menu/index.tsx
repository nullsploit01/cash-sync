import { useUser } from '@clerk/clerk-expo'
import { router } from 'expo-router'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Avatar } from 'tamagui'

import { Routes } from 'src/constants/routes'

const AppMenu = () => {
  const { user } = useUser()

  return (
    <TouchableOpacity onPress={() => router.navigate({ pathname: Routes.MenuPage.link })}>
      <Avatar circular size="$3">
        <Avatar.Image src={user.imageUrl} />
        <Avatar.Fallback backgroundColor="$gray10" />
      </Avatar>
    </TouchableOpacity>
  )
}

export default AppMenu
