import { ReactNode } from 'react'
import { InputFrameProps, ViewProps } from 'tamagui'

export interface IInputFieldProps extends InputFrameProps {
  error?: boolean
  errorMessage?: string
}

export interface IPressableTextProps extends ViewProps {
  children: ReactNode
  endIcon?: ReactNode
  startIcon?: ReactNode
}
