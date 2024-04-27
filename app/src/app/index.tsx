import Layout from '@/components/layout'
import BalanceCard from '@/components/molecules/balance-card'
import { XStack } from 'tamagui'

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
