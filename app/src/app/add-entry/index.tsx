import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { CalendarDays, ChevronDown, Clock4 } from '@tamagui/lucide-icons'
import { Stack } from 'expo-router'
import { useState } from 'react'
import { Text, View } from 'tamagui'

import Layout from 'src/components/layout'
import { getFormattedDate, getFormattedTime } from 'src/utils/date'

const AddEntryPage = () => {
  const [date, setDate] = useState(new Date())

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setDate(currentDate)
  }

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode
    })
  }

  const showDatepicker = () => {
    showMode('date')
  }

  const showTimepicker = () => {
    showMode('time')
  }

  return (
    <Layout>
      <Stack.Screen options={{ title: 'Add Entry' }} />
      <View display="flex" flexDirection="row" justifyContent="space-between" padding="$3">
        <View onPress={showDatepicker} display="flex" flexDirection="row" alignItems="center">
          <CalendarDays size={16} strokeWidth="$0.25" />
          <Text marginHorizontal="$1.5">{getFormattedDate(date)}</Text>
          <ChevronDown size={16} strokeWidth="$0.5" />
        </View>
        <View onPress={showTimepicker} display="flex" flexDirection="row" alignItems="center">
          <Clock4 size={16} strokeWidth="$0.25" />
          <Text marginHorizontal="$1.5">{getFormattedTime(date)}</Text>
          <ChevronDown size={16} strokeWidth="$0.5" />
        </View>
      </View>
    </Layout>
  )
}

export default AddEntryPage
