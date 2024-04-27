import { ILayoutProps } from '@/types/components/layout'
import React from 'react'
import { StatusBar } from 'react-native'
import { Button, ScrollView, View, XStack } from 'tamagui'

const Layout = ({ children }: ILayoutProps) => {
  return (
    <View
      style={{
        minHeight: '100%',
        position: 'relative',
        paddingTop: StatusBar.currentHeight
      }}
    >
      <ScrollView>{children}</ScrollView>
      <XStack
        gap="$size.8"
        position="absolute"
        bottom={0}
        padding="$5"
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          backgroundColor: '#fff',
          bottom: 0,
          position: 'absolute'
        }}
      >
        <Button size="$5">Cash In</Button>
        <Button size="$5">Cash Out</Button>
      </XStack>
    </View>
  )
}

export default Layout
