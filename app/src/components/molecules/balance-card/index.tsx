import { Card, Separator, SizableText, YStack } from 'tamagui'

const BalanceCard = () => {
  return (
    <Card elevate width="100%" style={{ marginTop: 10 }} bordered>
      <Card.Header padded>
        <SizableText size="$7" fontWeight="700">
          Net Balance
        </SizableText>
        <Separator marginTop={5} />
        <YStack style={{ paddingTop: 10 }} gap={8}>
          <SizableText size="$5">Net In</SizableText>
          <SizableText size="$5">Net Out</SizableText>
        </YStack>
      </Card.Header>
    </Card>
  )
}

export default BalanceCard
