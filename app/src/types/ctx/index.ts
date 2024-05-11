import { INoitification } from 'src/types/models'

export interface INotificationContext {
  showNotification: (notification: INoitification) => void
}
