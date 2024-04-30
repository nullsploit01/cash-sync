import { CalendarDays, ChevronDown, Clock4 } from '@tamagui/lucide-icons'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { Fragment, useEffect, useState } from 'react'
import { Text, View, XStack } from 'tamagui'

import InputField from 'src/components/atoms/input'
import PressableText from 'src/components/atoms/pressable-text'
import Layout from 'src/components/layout'
import SaveEntryMenu from 'src/components/molecules/save-entry-menu'
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
  const [_entry, setEntry] = useState<IEntry>({ paymentMode: PaymentModes.ONLINE } as IEntry)
  const [_entryValidation, setEntryValidation] = useState({ amount: true })

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
      enteredOn: new Date(date),
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
        <View paddingVertical="$3">
          <InputField
            onChange={(e) => {
              const value = e.nativeEvent.text?.replace(/[^0-9]/g, '')
              setEntry((prev) => {
                return { ...prev, amount: value }
              })
            }}
            autoFocus
            error={!_entryValidation.amount}
            errorMessage="Please enter a valid amount, eg 132"
            autoComplete="off"
            value={_entry?.amount}
            keyboardType="numeric"
            placeholder="Amount"
            size="$5"
          />
          {!!_entry && !!_entry.amount && (
            <Fragment>
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
              <View>
                <Text>Payment Mode</Text>
                <XStack gap="$3" marginVertical="$3">
                  <View
                    onPress={() => {
                      setEntry((prev) => {
                        return { ...prev, paymentMode: PaymentModes.ONLINE }
                      })
                    }}
                    backgroundColor={
                      _entry.paymentMode === PaymentModes.ONLINE ? '$green8' : '$gray6'
                    }
                    paddingVertical="$1.5"
                    paddingHorizontal="$3"
                    borderRadius="$6"
                  >
                    <Text>Online</Text>
                  </View>
                  <View
                    onPress={() => {
                      setEntry((prev) => {
                        return { ...prev, paymentMode: PaymentModes.CASH }
                      })
                    }}
                    backgroundColor={
                      _entry.paymentMode === PaymentModes.CASH ? '$green8' : '$gray6'
                    }
                    paddingVertical="$1.5"
                    paddingHorizontal="$3"
                    borderRadius="$6"
                  >
                    <Text>Cash</Text>
                  </View>
                </XStack>
              </View>
            </Fragment>
          )}
        </View>
      </View>
    </Layout>
  )
}

export default AddEntryPage
