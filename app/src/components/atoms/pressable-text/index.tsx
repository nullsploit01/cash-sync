import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Text, View } from 'tamagui'

import { IPressableTextProps } from 'src/types/components/atoms'

const PressableText = ({
  children,
  onPress,
  startIcon,
  endIcon,
  size = 16,
  ...props
}: IPressableTextProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View display="flex" flexDirection="row" alignItems="center" {...props}>
        {startIcon && startIcon}
        <Text fontSize={size} marginHorizontal="$1.5">
          {children}
        </Text>
        {endIcon && endIcon}
      </View>
    </TouchableOpacity>
  )
}

export default PressableText
