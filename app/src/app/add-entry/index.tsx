import { CalendarDays, ChevronDown, Clock4 } from '@tamagui/lucide-icons'
import { Stack } from 'expo-router'
import { View } from 'tamagui'

import InputField from 'src/components/atoms/input'
import PressableText from 'src/components/atoms/pressable-text'
import Layout from 'src/components/layout'
import useDatePicker from 'src/hooks/use-date-picker'
import { getFormattedDate, getFormattedTime } from 'src/utils/date'

const AddEntryPage = () => {
  const { date, showDatepicker } = useDatePicker()

  return (
    <Layout>
      <Stack.Screen options={{ title: 'Add Entry' }} />
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
