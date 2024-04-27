import Layout from '@/components/layout'
import BalanceCard from '@/components/molecules/balance-card'
import { XStack } from 'tamagui'

const HomePage = () => {
  return (
    <Layout>
      <XStack padding="$3" alignSelf="center">
        <BalanceCard />
      </XStack>
    </Layout>
  )
}

export default HomePage
