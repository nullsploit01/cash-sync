import { ReactNode } from 'react'
import { ViewProps } from 'tamagui'

export interface ILayoutProps extends ViewProps {
  footer?: ReactNode
  protectedRoute?: boolean
  children: ReactNode
}
