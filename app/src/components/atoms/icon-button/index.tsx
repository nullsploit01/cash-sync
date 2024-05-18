import React from 'react'
import { TouchableOpacity } from 'react-native'

import { IIconButtonProps } from 'src/types/components/atoms'

const IconButton = ({ icon, ...props }: IIconButtonProps) => {
  return <TouchableOpacity {...props}>{icon}</TouchableOpacity>
}

export default IconButton
