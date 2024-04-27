import { router } from 'expo-router'
import React from 'react'
import { Button, ScrollView, View, XStack } from 'tamagui'

import { Routes } from 'src/constants/routes'
import { ILayoutProps } from 'src/types/components/layout'

import { styles } from './styles'

const Layout = ({ children, showEntryButtons = false }: ILayoutProps) => {
  const handleEntryButtonPress = () => {
    router.navigate(Routes.AddEntryPage.link)
  }

  return (
    <View style={styles.container}>
      <ScrollView>{children}</ScrollView>
      {showEntryButtons && (
        <XStack gap="$size.8" style={styles.activityButtonStack}>
          <Button onPress={handleEntryButtonPress} size="$5">
            Cash In
          </Button>
          <Button onPress={handleEntryButtonPress} size="$5">
            Cash Out
          </Button>
        </XStack>
      )}
    </View>
  )
}

export default Layout
