import React from 'react'
import { ScrollView, View } from 'tamagui'

import { ILayoutProps } from 'src/types/components/layout'

const Layout = ({ children, footer }: ILayoutProps) => {
  return (
    <View minHeight="100%" position="relative">
      <ScrollView>{children}</ScrollView>
      {footer && (
        <View bottom={0} position="absolute" display="flex" justifyContent="center" width="100%">
          {footer}
        </View>
      )}
    </View>
  )
}

export default Layout
