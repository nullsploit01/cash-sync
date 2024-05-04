import { Redirect } from 'expo-router'

import { Routes } from 'src/constants/routes'

const OauthCallback = () => {
  return <Redirect href={Routes.HomePage.link} />
}

export default OauthCallback
