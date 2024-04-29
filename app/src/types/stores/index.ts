import { AddEntryTypes } from 'src/types/components/molecules'

export type PaymentModes = 'cash' | 'online'

export interface IEntry {
  amount: string
  remark: string
  enteredOn: Date
  paymentMode: PaymentModes
  balanceOnEntry: number
  type: AddEntryTypes
}

export interface INetWorth {
  netBalance: number
  totalIn: number
  totalOut: number
}

export interface IEntryState {
  entries?: IEntry[]
  netWorth: INetWorth
}

export interface IEntryActions {
  addEntry: (entry: IEntry) => void
}
