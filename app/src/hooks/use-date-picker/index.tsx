import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { useState } from 'react'

import { IDatePickerTypes } from 'src/types/hooks'

const useDatePicker = () => {
  const [date, setDate] = useState(new Date())

  const onChange = (_: DateTimePickerEvent, selectedDate: Date) => {
    setDate(selectedDate)
  }

  const showMode = (mode: IDatePickerTypes) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode
    })
  }

  const showDatepicker = (type: IDatePickerTypes = 'date') => {
    showMode(type)
  }

  return { date, showDatepicker }
}

export default useDatePicker
