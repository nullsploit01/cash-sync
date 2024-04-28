import { CalendarDays, ChevronDown, Clock4 } from '@tamagui/lucide-icons'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { View } from 'tamagui'

import InputField from 'src/components/atoms/input'
import PressableText from 'src/components/atoms/pressable-text'
import Layout from 'src/components/layout'
import { EntryTypes } from 'src/constants/entry-types'
import useDatePicker from 'src/hooks/use-date-picker'
import { getFormattedDate, getFormattedTime } from 'src/utils/date'

const AddEntryPage = () => {
  const params = useLocalSearchParams()
  const { date, showDatepicker } = useDatePicker()

  const [_title, setTitle] = useState({ title: '', color: '' })

  useEffect(() => {
    const { entryType } = params

    switch (entryType) {
      case EntryTypes.cashIn:
        setTitle({ title: 'Add Cash In Entry', color: 'green' })
        break

      case EntryTypes.cashOut:
        setTitle({ title: 'Add Cash Out Entry', color: 'red' })
        break

      default:
        setTitle({ title: 'Add Cash In Entry', color: 'black' })
        break
    }
  }, [])

  return (
    <Layout>
      <Stack.Screen options={{ title: _title.title, headerTitleStyle: { color: _title.color } }} />
      <View paddingHorizontal="$3">
        <View
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          paddingVertical="$3"
        >
          <PressableText
            onPress={() => showDatepicker()}
            startIcon={<CalendarDays size={16} strokeWidth="$0.25" />}
            endIcon={<ChevronDown size={16} strokeWidth="$0.5" />}
          >
            {getFormattedDate(date)}
          </PressableText>
          <PressableText
            onPress={() => showDatepicker('time')}
            startIcon={<Clock4 size={16} strokeWidth="$0.25" />}
            endIcon={<ChevronDown size={16} strokeWidth="$0.5" />}
          >
            {getFormattedTime(date)}
          </PressableText>
        </View>
        <View paddingVertical="$3">
          <InputField autoFocus keyboardType="number-pad" placeholder="Amount" size="$5" />
        </View>
      </View>
    </Layout>
  )
}

export default AddEntryPage
