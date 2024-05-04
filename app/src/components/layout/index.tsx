import { Redirect } from 'expo-router'
import React, { Fragment } from 'react'
import { ScrollView, View } from 'tamagui'

import { Routes } from 'src/constants/routes'
import { ILayoutProps } from 'src/types/components/layout'

const Layout = ({ children, footer, protectedRoute = false }: ILayoutProps) => {
  return (
    <Fragment>
      {protectedRoute ? (
        <Redirect href={Routes.SigninPage.link} />
      ) : (
        <View minHeight="100%" position="relative">
          <ScrollView>{children}</ScrollView>
          {footer && (
            <View
              bottom={0}
              position="absolute"
              display="flex"
              justifyContent="center"
              width="100%"
            >
              {footer}
            </View>
          )}
        </View>
      )}
    </Fragment>
  )
}

export default Layout
