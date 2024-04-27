import { Stack } from 'expo-router'
import { Separator, XStack } from 'tamagui'

import Layout from 'src/components/layout'
import BalanceCard from 'src/components/molecules/balance-card'
import EntryCard from 'src/components/molecules/entry-card'

const HomePage = () => {
  return (
    <Layout showEntryButtons>
      <Stack.Screen options={{ title: 'Your Expenses' }} />
      <XStack paddingHorizontal="$3" alignSelf="center">
        <BalanceCard />
      </XStack>
      <Separator marginVertical={10} />
      <EntryCard />
    </Layout>
  )
}

export default HomePage
