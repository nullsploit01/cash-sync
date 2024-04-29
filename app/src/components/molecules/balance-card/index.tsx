import { Card, Separator, SizableText, XStack, YStack } from 'tamagui'

import useEntryStore from 'src/stores/use-entry'

const BalanceCard = () => {
  const { netWorth } = useEntryStore()

  return (
    <Card elevate marginVertical={10} width="100%">
      <Card.Header padded>
        <XStack justifyContent="space-between" alignItems="center">
          <SizableText size="$7" fontWeight="700">
            Net Balance
          </SizableText>
          <SizableText size="$6" fontWeight="500">
            {netWorth.netBalance}
          </SizableText>
        </XStack>
        <Separator marginTop={5} />
        <YStack paddingTop={10} gap={8}>
          <XStack justifyContent="space-between" alignItems="center">
            <SizableText size="$5">Total In (+)</SizableText>
            <SizableText size="$5" color="green">
              {netWorth.totalIn}
            </SizableText>
          </XStack>
          <XStack justifyContent="space-between" alignItems="center">
            <SizableText size="$5">Total Out (-)</SizableText>
            <SizableText size="$5" color="red">
              {netWorth.totalOut}
            </SizableText>
          </XStack>
        </YStack>
      </Card.Header>
    </Card>
  )
}

export default BalanceCard
