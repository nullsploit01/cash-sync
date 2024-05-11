import { useContext } from 'react'

import { NotificationContext } from 'src/ctx/notification'

export const useNotification = () => {
  const notificationContext = useContext(NotificationContext)

  if (!notificationContext) throw new Error('Wrap component around NotificationProvider')

  return notificationContext
}
