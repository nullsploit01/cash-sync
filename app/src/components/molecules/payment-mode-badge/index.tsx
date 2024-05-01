import { Text } from 'tamagui'

import Badge from 'src/components/atoms/badge'
import { PaymentModes } from 'src/constants/entry'
import { IPaymentModeBadgeProps } from 'src/types/components/molecules'

const PaymentModeBadge = ({ entry, borderRadius = 2 }: IPaymentModeBadgeProps) => {
  return (
    <Badge borderRadius={borderRadius}>
      <Text theme="alt1">{entry.paymentMode === PaymentModes.ONLINE ? 'Online' : 'Cash'}</Text>
    </Badge>
  )
}

export default PaymentModeBadge
