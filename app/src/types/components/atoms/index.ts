import { ReactNode } from 'react'
import { TouchableProps } from 'react-native-svg'
import { InputFrameProps, PopoverProps, ViewProps } from 'tamagui'

export interface IInputFieldProps extends InputFrameProps {
  error?: boolean
  errorMessage?: string
}

export interface IPressableTextProps extends ViewProps {
  children: ReactNode
  endIcon?: ReactNode
  startIcon?: ReactNode
  size?: number
}

export interface IBadgeProps extends ViewProps {
  children?: ReactNode
}

export interface ISheetPopoverProps extends PopoverProps {
  content: ReactNode
  children: ReactNode
}

export interface IIconButtonProps extends TouchableProps {
  icon: ReactNode
}
