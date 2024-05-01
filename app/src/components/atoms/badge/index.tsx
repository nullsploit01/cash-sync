import { View } from 'tamagui'

import { IBadgeProps } from 'src/types/components/atoms'

const Badge = ({ children, ...rest }: IBadgeProps) => {
  return (
    <View backgroundColor="$gray6" paddingVertical="$1" paddingHorizontal="$2" {...rest}>
      {children && children}
    </View>
  )
}

export default Badge
