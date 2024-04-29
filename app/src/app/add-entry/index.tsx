import { CalendarDays, ChevronDown, Clock4 } from '@tamagui/lucide-icons'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { View } from 'tamagui'

import InputField from 'src/components/atoms/input'
import PressableText from 'src/components/atoms/pressable-text'
import Layout from 'src/components/layout'
import SaveEntryMenu from 'src/components/molecules/save-entry-menu'
import { EntryTypes } from 'src/constants/entry-types'
import { Routes } from 'src/constants/routes'
import useDatePicker from 'src/hooks/use-date-picker'
import useEntryStore from 'src/stores/use-entry'
import { AddEntryTypes } from 'src/types/components/molecules'
import { IEntry } from 'src/types/stores'
import { getFormattedDate, getFormattedTime } from 'src/utils/date'

const AddEntryPage = () => {
  const params = useLocalSearchParams()
  const { date, showDatepicker } = useDatePicker()

  const [_entry, setEntry] = useState<IEntry>()
  const [_title, setTitle] = useState({ title: '', color: '' })

  const { addEntry, netWorth } = useEntryStore()

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

  const _addEntry = () => {
    const entry: IEntry = {
      amount: _entry.amount,
      remark: _entry.remark,
      enteredOn: new Date(date),
      paymentMode: 'online',
      balanceOnEntry: getBalanceOnEntry(),
      type: params.entryType as AddEntryTypes
    }

    addEntry(entry)
  }

  const getBalanceOnEntry = () => {
    const { entryType } = params

    if (!_entry?.amount) {
      return 0
    }

    if (entryType === EntryTypes.cashOut) {
      return netWorth.netBalance - +_entry.amount
    }

    return netWorth.netBalance + +_entry.amount
  }

  const onSave = () => {
    _addEntry()
    router.navigate({ pathname: Routes.HomePage.link })
  }

  const onSaveAndNew = () => {
    _addEntry()
    router.replace({ pathname: Routes.AddEntryPage.link, params })
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
        <View paddingVertical="$3">
          <InputField
            onChange={(e) => {
              const value = e.nativeEvent.text?.replace(/[^0-9]/g, '')
              setEntry((prev) => {
                return { ...prev, amount: value }
              })
            }}
            autoComplete="off"
            value={_entry?.amount}
            autoFocus
            keyboardType="numeric"
            placeholder="Amount"
            size="$5"
          />
          {!!_entry && !!_entry.amount && (
            <InputField
              onChange={(e) => {
                const value = e.nativeEvent.text
                setEntry((prev) => {
                  return { ...prev, remark: value }
                })
              }}
              autoComplete="off"
              value={_entry?.remark}
              placeholder="Remark"
              size="$5"
              marginVertical="$5"
            />
          )}
        </View>
      </View>
    </Layout>
  )
}

export default AddEntryPage
