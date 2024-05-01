import { EntryTypes, PaymentModes } from 'src/constants/entry'

export interface IEntry {
  id: string
  amount: string
  remark: string
  enteredOn: Date
  paymentMode: PaymentModes
  balanceOnEntry: number
  type: EntryTypes
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
  updateEntry: (entry: IEntry) => void
}
