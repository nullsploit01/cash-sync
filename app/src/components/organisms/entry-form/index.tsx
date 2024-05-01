import { Fragment } from 'react'
import { Text, View, XStack } from 'tamagui'

import InputField from 'src/components/atoms/input'
import { PaymentModes } from 'src/constants/entry'
import { IEntryFormProps } from 'src/types/components/organisms'

const EntryForm = ({ entry, setEntry, validation }: IEntryFormProps) => {
  return (
    <View>
      <View paddingVertical="$3">
        <InputField
          onChange={(e) => {
            const value = e.nativeEvent.text?.replace(/[^0-9]/g, '')
            setEntry((prev) => {
              return { ...prev, amount: value }
            })
          }}
          autoFocus
          error={!validation.amount}
          errorMessage="Please enter a valid amount, eg 132"
          autoComplete="off"
          value={entry?.amount}
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
