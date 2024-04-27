import { Stack } from 'expo-router'
import { Text, View } from 'tamagui'

import Layout from 'src/components/layout'

const AddEntryPage = () => {
  return (
    <Layout>
      <Stack.Screen options={{ title: 'Add Entry' }} />
      <View>
        <Text>Add Entry</Text>
      </View>
    </Layout>
  )
}

export default AddEntryPage
