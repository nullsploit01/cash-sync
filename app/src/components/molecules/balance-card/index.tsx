import { Card, Separator, SizableText, YStack } from 'tamagui'

const BalanceCard = () => {
  return (
    <Card elevate marginVertical={10} width="100%">
      <Card.Header padded>
        <SizableText size="$7" fontWeight="700">
          Net Balance
        </SizableText>
        <Separator marginTop={5} />
        <YStack paddingTop={10} gap={8}>
          <SizableText size="$5">Total In</SizableText>
          <SizableText size="$5">Total Out</SizableText>
        </YStack>
      </Card.Header>
    </Card>
  )
}

export default BalanceCard
