import { PropsWithChildren, ReactNode } from 'react'

export interface ILayoutProps extends PropsWithChildren {
  footer?: ReactNode
  protectedRoute?: boolean
}
