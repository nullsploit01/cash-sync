import { CalendarDays, ChevronDown, Clock4 } from '@tamagui/lucide-icons'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { View } from 'tamagui'

import PressableText from 'src/components/atoms/pressable-text'
import Layout from 'src/components/layout'
import SaveEntryMenu from 'src/components/molecules/save-entry-menu'
import EntryForm from 'src/components/organisms/entry-form'
import { EntryTypes, PaymentModes } from 'src/constants/entry'
import { Routes } from 'src/constants/routes'
import useDatePicker from 'src/hooks/use-date-picker'
import useEntryStore from 'src/stores/use-entry'
import { IEntry } from 'src/types/stores'
import { getFormattedDate, getFormattedTime } from 'src/utils/date'
import { generateRandomId } from 'src/utils/general'

const AddEntryPage = () => {
  const { entryType } = useLocalSearchParams() as any
  const { date, showDatepicker } = useDatePicker()

  const [_title, setTitle] = useState({ title: '', color: '' })
  const [_entryValidation, setEntryValidation] = useState({ amount: true })
  const [_entry, setEntry] = useState<IEntry>({ paymentMode: PaymentModes.ONLINE } as IEntry)

  const { addEntry, netWorth } = useEntryStore()

  useEffect(() => {
    switch (+entryType) {
      case EntryTypes.CASH_IN:
        setTitle({ title: 'Add Cash In Entry', color: 'green' })
        break

      case EntryTypes.CASH_OUT:
        setTitle({ title: 'Add Cash Out Entry', color: 'red' })
        break

      default:
        setTitle({ title: 'Add Cash In Entry', color: 'black' })
        break
    }
  }, [])

  useEffect(() => {
    setEntryValidation({ amount: true })
  }, [_entry])

  const _addEntry = () => {
    const entry: IEntry = {
      id: generateRandomId(),
      amount: _entry.amount,
      remark: _entry.remark,
      enteredOn: date,
      paymentMode: _entry.paymentMode,
      balanceOnEntry: getBalanceOnEntry(),
      type: +entryType as EntryTypes
    }

    addEntry(entry)
  }

  const getBalanceOnEntry = () => {
    if (!_entry?.amount) {
      return 0
    }

    if (entryType === EntryTypes.CASH_OUT) {
      return netWorth.netBalance - +_entry.amount
    }

    return netWorth.netBalance + +_entry.amount
  }

  const onSave = () => {
    if (!_entry.amount?.trim()) {
      setEntryValidation({ amount: false })
      return
    }

    _addEntry()
    router.navigate({ pathname: Routes.HomePage.link })
  }

  const onSaveAndNew = () => {
    if (!_entry.amount?.trim()) {
      setEntryValidation({ amount: false })
      return
    }

    _addEntry()
    router.replace({ pathname: Routes.AddEntryPage.link, params: { entryType } })
  }

  return (
    <Layout footer={<SaveEntryMenu onSave={onSave} onSaveAndNew={onSaveAndNew} />}>
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
        <EntryForm
          entry={_entry}
          setEntry={setEntry}
          validation={_entryValidation}
          showDatepicker={showDatepicker}
        />
      </View>
    </Layout>
  )
}

export default AddEntryPage
