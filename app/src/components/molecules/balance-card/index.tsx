import { Fragment } from 'react'
import { Card, Separator, SizableText, XStack, YStack } from 'tamagui'

import Loading from 'src/components/organisms/loading'
import useBookStore from 'src/stores/use-book'

const BalanceCard = () => {
  const { currentBook, loading } = useBookStore()

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Card elevate marginVertical={10} width="100%">
          <Card.Header padded>
            <XStack justifyContent="space-between" alignItems="center">
              <SizableText size="$7" fontWeight="700">
                Net Balance
              </SizableText>
              <SizableText size="$6" fontWeight="500">
                {currentBook.balance}
              </SizableText>
            </XStack>
            <Separator marginTop={5} />
            <YStack paddingTop={10} gap={8}>
              <XStack justifyContent="space-between" alignItems="center">
                <SizableText size="$5">Total In (+)</SizableText>
                <SizableText size="$5" color="green">
                  {currentBook.totalIn}
                </SizableText>
              </XStack>
              <XStack justifyContent="space-between" alignItems="center">
                <SizableText size="$5">Total Out (-)</SizableText>
                <SizableText size="$5" color="red">
                  {currentBook.totalOut}
                </SizableText>
              </XStack>
            </YStack>
          </Card.Header>
        </Card>
      )}
    </Fragment>
  )
}

export default BalanceCard
