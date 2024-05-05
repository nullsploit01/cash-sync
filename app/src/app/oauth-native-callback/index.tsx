import { Redirect, Stack, useFocusEffect } from 'expo-router'
import { Fragment, useState } from 'react'

import Loading from 'src/components/organisms/loading'
import { Routes } from 'src/constants/routes'

const OauthCallback = () => {
  const [redirect, setRedirect] = useState(false)

  useFocusEffect(() => {
    setTimeout(() => {
      setRedirect(true)
    }, 1500)
  })

  return (
    <Fragment>
      <Stack.Screen options={{ headerShown: false }} />
      <Loading />
      {redirect && <Redirect href={Routes.HomePage.link} />}
    </Fragment>
  )
}

export default OauthCallback
