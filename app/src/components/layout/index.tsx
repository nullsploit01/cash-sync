import { ILayoutProps } from '@/types/components/layout'
import React from 'react'
import { Button, ScrollView, View, XStack } from 'tamagui'

import { styles } from './styles'

const Layout = ({ children }: ILayoutProps) => {
  return (
    <View style={styles.container}>
      <ScrollView>{children}</ScrollView>
      <XStack gap="$size.8" style={styles.activityButtonStack}>
        <Button size="$5">Cash In</Button>
        <Button size="$5">Cash Out</Button>
      </XStack>
    </View>
  )
}

export default Layout
