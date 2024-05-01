import { Pencil } from '@tamagui/lucide-icons'
import { router } from 'expo-router'
import React from 'react'
import { Card, Separator, Text, View, XStack } from 'tamagui'

import PressableText from 'src/components/atoms/pressable-text'
import PaymentModeBadge from 'src/components/molecules/payment-mode-badge'
import { EntryTypes } from 'src/constants/entry'
import { Routes } from 'src/constants/routes'
import { IEntryDetailsCardProps } from 'src/types/components/molecules'
import { getFormattedDate, getFormattedTime } from 'src/utils/date'

const EntryDetailsCard = ({ entry }: IEntryDetailsCardProps) => {
  const onEditPress = () => {
    router.navigate({ pathname: Routes.EditEntryPage.link, params: { id: entry.id } })
  }

  return (
    <Card elevate shadowColor="$accentColor" borderTopColor="$gray10Dark" borderTopWidth="$1.5">
      <View margin="$3">
        <XStack justifyContent="space-between" alignItems="center">
          <Text theme="alt1">{entry.type === EntryTypes.CASH_IN ? 'Cash In' : 'Cash Out'}</Text>
          <Text>
            On {getFormattedDate(entry.enteredOn)}, {getFormattedTime(entry.enteredOn)}
          </Text>
        </XStack>
        <Text
          fontSize="$7"
          marginTop="$2"
          color={entry.type === EntryTypes.CASH_IN ? 'green' : 'red'}
        >
          {entry.amount}
        </Text>
        <Separator marginVertical="$5" borderWidth="$0.25" borderColor="$gray9" />
        <XStack>
          <PaymentModeBadge borderRadius={5} entry={entry} />
        </XStack>
      </View>
      <Separator marginVertical="$3" borderWidth="$0.25" borderColor="$gray9" />
      <View justifyContent="center" alignItems="center" marginTop="$1" marginBottom="$3">
        <PressableText onPress={onEditPress} startIcon={<Pencil />}>
          Edit Entry
        </PressableText>
      </View>
    </Card>
  )
}

export default EntryDetailsCard
