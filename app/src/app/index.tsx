import { XStack } from 'tamagui'

import Layout from 'src/components/layout'
import BalanceCard from 'src/components/molecules/balance-card'

const HomePage = () => {
  return (
    <Layout showEntryButtons>
      <XStack padding="$3" alignSelf="center">
        <BalanceCard />
      </XStack>
    </Layout>
  )
}

export default HomePage
