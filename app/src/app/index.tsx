import BalanceCard from '@/components/molecules/balance-card'
import { XStack } from 'tamagui'

const HomePage = () => {
  return (
    <XStack padding="$3" alignSelf="center">
      <BalanceCard />
    </XStack>
  )
}

export default HomePage
