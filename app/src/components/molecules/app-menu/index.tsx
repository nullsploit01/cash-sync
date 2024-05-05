import { Menu } from '@tamagui/lucide-icons'
import { router } from 'expo-router'
import React from 'react'
import { TouchableOpacity } from 'react-native'

import { Routes } from 'src/constants/routes'

const AppMenu = () => {
  return (
    <TouchableOpacity onPress={() => router.navigate({ pathname: Routes.MenuPage.link })}>
      <Menu />
    </TouchableOpacity>
  )
}

export default AppMenu
