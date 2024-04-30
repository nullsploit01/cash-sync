import { Text, View } from 'tamagui'

import { PaymentModes } from 'src/constants/entry'
import { IPaymentModeBadgeProps } from 'src/types/components/molecules'

const PaymentModeBadge = ({ entry, borderRadius = 2 }: IPaymentModeBadgeProps) => {
  return (
    <View
      backgroundColor="$gray6"
      paddingVertical="$1"
      paddingHorizontal="$2"
      borderRadius={borderRadius}
    >
      <Text theme="alt1">{entry.paymentMode === PaymentModes.CASH ? 'Online' : 'Cash'}</Text>
    </View>
  )
}

export default PaymentModeBadge
