import { CalendarDays, ChevronDown, Clock4 } from '@tamagui/lucide-icons'
import { Stack, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useMemo, useState } from 'react'
import { Text, View, XStack } from 'tamagui'

import Badge from 'src/components/atoms/badge'
import PressableText from 'src/components/atoms/pressable-text'
import Layout from 'src/components/layout'
import EntryForm from 'src/components/organisms/entry-form'
import { EntryTypes } from 'src/constants/entry'
import useDatePicker from 'src/hooks/use-date-picker'
import useEntryStore from 'src/stores/use-entry'
import { IEntry } from 'src/types/stores'
import { getFormattedDate, getFormattedTime } from 'src/utils/date'

const EditEntryPage = () => {
  const { entries } = useEntryStore()
  const { id } = useLocalSearchParams() as any
  const { date, showDatepicker } = useDatePicker()

  const [_entryValidation, setEntryValidation] = useState({ amount: true })
  const [_entry, setEntry] = useState<IEntry>()

  useEffect(() => {
    const entry = entries.find((e) => e.id === id)
    setEntry(entry)
  }, [])

  useMemo(() => {
    setEntry((prev) => {
      return { ...prev, enteredOn: date }
    })
  }, [date])

  return (
    <Layout>
      <Stack.Screen options={{ title: 'Edit Entry' }} />
      {_entry && (
        <View paddingHorizontal="$3">
          <XStack marginTop="$3" gap="$2" alignItems="center">
            <Badge
              borderRadius="$8"
              paddingHorizontal="$3"
              onPress={() => {
                setEntry((prev) => {
                  return { ...prev, type: EntryTypes.CASH_IN }
                })
              }}
              backgroundColor={_entry.type === EntryTypes.CASH_IN ? '$green8' : '$gray6'}
            >
              <Text fontSize="$5">Cash In</Text>
            </Badge>
            <Badge
              borderRadius="$8"
              paddingHorizontal="$3"
              onPress={() => {
                setEntry((prev) => {
                  return { ...prev, type: EntryTypes.CASH_OUT }
                })
              }}
              backgroundColor={_entry.type === EntryTypes.CASH_OUT ? '$red10' : '$gray6'}
            >
              <Text fontSize="$5">Cash Out</Text>
            </Badge>
          </XStack>
          <View
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            marginVertical="$3"
          >
            <PressableText
              onPress={() => showDatepicker()}
              startIcon={<CalendarDays size={16} strokeWidth="$0.25" />}
              endIcon={<ChevronDown size={16} strokeWidth="$0.5" />}
            >
              {getFormattedDate(_entry.enteredOn)}
            </PressableText>
            <PressableText
              onPress={() => showDatepicker('time')}
              startIcon={<Clock4 size={16} strokeWidth="$0.25" />}
              endIcon={<ChevronDown size={16} strokeWidth="$0.5" />}
            >
              {getFormattedTime(_entry.enteredOn)}
            </PressableText>
          </View>
          <EntryForm entry={_entry} setEntry={setEntry} validation={_entryValidation} />
        </View>
      )}
    </Layout>
  )
}

export default EditEntryPage
