import { Card, Separator, Text, View, XStack, YStack } from 'tamagui'

import { getFormattedDate, getFormattedTime } from 'src/utils/date'

const EntryCard = () => {
  return (
    <View>
      <View paddingHorizontal="$3" marginBottom="$2">
        <Text>{getFormattedDate(new Date())}</Text>
      </View>
      <Card>
        <Card.Header paddingHorizontal="$3">
          <XStack alignItems="center" justifyContent="space-between">
            <Text>Online</Text>
            <YStack alignItems="flex-end">
              <Text>1</Text>
              <Text>Balance: 1</Text>
            </YStack>
          </XStack>
          <Text>Some Description</Text>
          <Separator marginVertical="$2" />
          <Text fontWeight="800">
            Entry by You <Text theme="alt1">at {getFormattedTime(new Date())}</Text>
          </Text>
        </Card.Header>
      </Card>
    </View>
  )
}

export default EntryCard
