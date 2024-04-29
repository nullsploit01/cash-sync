import { Card, Separator, Text, View, XStack, YStack } from 'tamagui'

import { IEntryCardProps } from 'src/types/components/molecules'
import { getFormattedDate, getFormattedTime } from 'src/utils/date'

const EntryCard = ({ entry }: IEntryCardProps) => {
  return (
    <View>
      <View paddingHorizontal="$3" marginBottom="$2">
        <Text>{getFormattedDate(entry.enteredOn)}</Text>
      </View>
      <Card>
        <Card.Header paddingHorizontal="$3">
          <XStack alignItems="center" justifyContent="space-between">
            <View
              backgroundColor="$gray6"
              paddingVertical="$1"
              paddingHorizontal="$2"
              borderRadius="$2"
            >
              <Text theme="alt1">{entry.paymentMode === 'online' ? 'Online' : 'Cash'}</Text>
            </View>
            <YStack alignItems="flex-end">
              <Text color={entry.type === 'CASH_IN' ? 'green' : 'red'}>{entry.amount}</Text>
              <Text>Balance: {entry.balanceOnEntry}</Text>
            </YStack>
          </XStack>
          <Text>{entry.remark}</Text>
          <Separator marginVertical="$2" />
          <Text fontWeight="800">
            Entry by You <Text theme="alt1">at {getFormattedTime(entry.enteredOn)}</Text>
          </Text>
        </Card.Header>
      </Card>
    </View>
  )
}

export default EntryCard
