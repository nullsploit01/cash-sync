export interface IUser {
  id: string
  firstName: string
  lastName: string
  emailAddresses: string[]
  imageUrl: string
}

export interface INoitification {
  title: string
  message: string
  type?: 'success' | 'error' | 'info'
}
