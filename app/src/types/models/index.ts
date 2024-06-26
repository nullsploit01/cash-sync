import { EntryTypes, PaymentModes } from 'src/constants/entry'

export interface IUser {
  id: string
  firstName: string
  lastName: string
  emailAddresses: string[]
  imageUrl: string
}

export interface IBook {
  id: string
  userId: string
  name: string
  balance: number
  totalIn: number
  totalOut: number
  createdAt: Date
  updatedAt: Date
}

export interface IEntry {
  id: string
  userId: string
  bookId: string
  amount: number
  remark: string
  paymentMode: PaymentModes
  type: EntryTypes
  createdAt: Date
  enteredOn: Date
  updatedAt: Date
}

export interface INoitification {
  title: string
  message: string
  type?: 'success' | 'error' | 'info'
}
