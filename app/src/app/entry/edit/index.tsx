import { Stack } from 'expo-router'
import React from 'react'
import { Text } from 'tamagui'

import Layout from 'src/components/layout'

const EditEntryPage = () => {
  return (
    <Layout>
      <Stack.Screen options={{ title: 'Edit Entry' }} />
      <Text>Edit Shit</Text>
    </Layout>
  )
}

export default EditEntryPage
