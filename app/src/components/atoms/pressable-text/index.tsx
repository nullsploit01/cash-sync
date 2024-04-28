import React from 'react'
import { Text, View } from 'tamagui'

import { IPressableTextProps } from 'src/types/components/atoms'

const PressableText = ({
  children,
  onPress,
  startIcon,
  endIcon,
  ...props
}: IPressableTextProps) => {
  return (
    <View onPress={onPress} display="flex" flexDirection="row" alignItems="center" {...props}>
      {startIcon && startIcon}
      <Text marginHorizontal="$1.5">{children}</Text>
      {endIcon && endIcon}
    </View>
  )
}

export default PressableText
