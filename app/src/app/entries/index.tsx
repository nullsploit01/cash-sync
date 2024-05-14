import { Stack } from 'expo-router'
import { Separator, XStack } from 'tamagui'

import Layout from 'src/components/layout'
import AddEntryMenu from 'src/components/molecules/add-entry-menu'
import BalanceCard from 'src/components/molecules/balance-card'
import Entries from 'src/components/organisms/entries'

const EntriesPage = () => {
  return (
    <Layout footer={<AddEntryMenu />} protectedRoute>
      <Stack.Screen options={{ title: 'Your Expenses' }} />
      <XStack paddingHorizontal="$3" marginVertical="$3" alignSelf="center" width="100%">
        <BalanceCard />
      </XStack>
      <Separator marginVertical={10} />
      <Entries />
    </Layout>
  )
}

export default EntriesPage
