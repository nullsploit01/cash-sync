import React from 'react'
import { ScrollView, View } from 'tamagui'

import AddEntryMenu from 'src/components/molecules/add-entry-menu'
import { ILayoutProps } from 'src/types/components/layout'

import { styles } from './styles'

const Layout = ({ children, showEntryButtons = false }: ILayoutProps) => {
  return (
    <View style={styles.container}>
      <ScrollView>{children}</ScrollView>
      {showEntryButtons && <AddEntryMenu />}
    </View>
  )
}

export default Layout
