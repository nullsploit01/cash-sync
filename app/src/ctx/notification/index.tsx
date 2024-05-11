import { createContext, PropsWithChildren } from 'react'
import Toast from 'react-native-toast-message'

import { INotificationContext } from 'src/types/ctx'
import { INoitification } from 'src/types/models'

export const NotificationContext = createContext<INotificationContext>({} as INotificationContext)

export const NotificationProvider = ({ children }: PropsWithChildren) => {
  const showNotification = ({ title, message, type = 'info' }: INoitification) => {
    Toast.show({
      text1: title,
      text2: message,
      type,
      position: 'bottom'
    })
  }

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Toast />
    </NotificationContext.Provider>
  )
}
