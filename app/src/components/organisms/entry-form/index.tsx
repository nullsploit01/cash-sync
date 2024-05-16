import { CalendarDays, ChevronDown, Clock4 } from '@tamagui/lucide-icons'
import { Fragment, useEffect, useRef } from 'react'
import { Text, View, XStack } from 'tamagui'

import Badge from 'src/components/atoms/badge'
import InputField from 'src/components/atoms/input'
import PressableText from 'src/components/atoms/pressable-text'
import { EntryTypes, PaymentModes } from 'src/constants/entry'
import useDatePicker from 'src/hooks/use-date-picker'
import { IEntryFormProps } from 'src/types/components/organisms'
import { getFormattedDate, getFormattedTime } from 'src/utils/date'

const EntryForm = ({ entry, setEntry, validation }: IEntryFormProps) => {
  const { date, showDatepicker } = useDatePicker()

  const prevDateRef = useRef(date)

  useEffect(() => {
    if (prevDateRef.current !== date || !entry.enteredOn) {
      setEntry((prevEntry) => ({
        ...prevEntry,
        enteredOn: date
      }))
    }

    prevDateRef.current = date
  }, [date])

  return (
    <View>
      <View paddingVertical="$3">
        {entry.type !== undefined && (
          <XStack marginTop="$3" gap="$2" alignItems="center">
            <Badge
              borderRadius="$8"
              paddingHorizontal="$3"
              onPress={() => {
                setEntry((prev) => {
                  return { ...prev, type: EntryTypes.CASH_IN }
                })
              }}
              backgroundColor={entry.type === EntryTypes.CASH_IN ? '$green8' : '$gray6'}
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
              backgroundColor={entry.type === EntryTypes.CASH_OUT ? '$red10' : '$gray6'}
            >
              <Text fontSize="$5">Cash Out</Text>
            </Badge>
          </XStack>
        )}
        <View display="flex" flexDirection="row" justifyContent="space-between" marginVertical="$3">
          <PressableText
            onPress={() => showDatepicker()}
            startIcon={<CalendarDays size={16} strokeWidth="$0.25" />}
            endIcon={<ChevronDown size={16} strokeWidth="$0.5" />}
          >
            {getFormattedDate(entry.enteredOn)}
          </PressableText>
          <PressableText
            onPress={() => showDatepicker('time')}
            startIcon={<Clock4 size={16} strokeWidth="$0.25" />}
            endIcon={<ChevronDown size={16} strokeWidth="$0.5" />}
          >
            {getFormattedTime(entry.enteredOn)}
          </PressableText>
        </View>
        <InputField
          onChange={(e) => {
            const value = e.nativeEvent.text?.replace(/[^0-9]/g, '')
            setEntry((prev) => {
              return { ...prev, amount: +value }
            })
          }}
          autoFocus
          error={!validation.amount}
          errorMessage="Please enter a valid amount, eg 132"
          autoComplete="off"
          value={entry?.amount?.toString()}
          keyboardType="numeric"
          placeholder="Amount"
          size="$5"
        />
        {!!entry && !!entry.amount && (
          <Fragment>
            <InputField
              onChange={(e) => {
                const value = e.nativeEvent.text
                setEntry((prev) => {
                  return { ...prev, remark: value }
                })
              }}
              autoComplete="off"
              value={entry?.remark}
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
                  backgroundColor={entry.paymentMode === PaymentModes.ONLINE ? '$green8' : '$gray6'}
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
                  backgroundColor={entry.paymentMode === PaymentModes.CASH ? '$green8' : '$gray6'}
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
  )
}

export default EntryForm
