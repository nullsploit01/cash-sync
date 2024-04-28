import { Stack } from 'expo-router'
import { Separator, XStack } from 'tamagui'

import Layout from 'src/components/layout'
import BalanceCard from 'src/components/molecules/balance-card'
import Entries from 'src/components/organisms/entries'

const HomePage = () => {
  return (
    <Layout showEntryButtons>
      <Stack.Screen options={{ title: 'Your Expenses' }} />
      <XStack paddingHorizontal="$3" marginVertical="$3" alignSelf="center" width="100%">
        <BalanceCard />
      </XStack>
      <Separator marginVertical={10} />
      <Entries />
    </Layout>
  )
}

export default HomePage
