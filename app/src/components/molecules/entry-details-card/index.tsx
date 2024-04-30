import React from 'react'
import { Separator, Text, View, XStack } from 'tamagui'

import { EntryTypes } from 'src/constants/entry'
import { IEntryDetailsCardProps } from 'src/types/components/molecules'
import { getFormattedDate, getFormattedTime } from 'src/utils/date'

const EntryDetailsCard = ({ entry }: IEntryDetailsCardProps) => {
  return (
    <View width="100%" borderTopColor="$gray10Dark" borderTopWidth="$1.5">
      <View margin="$3">
        <XStack justifyContent="space-between" alignItems="center">
          <Text theme="alt1">{entry.type === EntryTypes.CASH_IN ? 'Cash In' : 'Cash Out'}</Text>
          <Text>
            On {getFormattedDate(entry.enteredOn)}, {getFormattedTime(entry.enteredOn)}
          </Text>
        </XStack>
        <Text
          fontSize="$7"
          color={entry.type === EntryTypes.CASH_IN ? 'green' : 'red'}
          marginVertical="$3"
        >
          {entry.amount}
        </Text>
        <Separator />
      </View>
    </View>
  )
}

export default EntryDetailsCard
