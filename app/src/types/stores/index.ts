export type PaymentModes = 'cash' | 'online'

export interface IEntry {
  amount: string
  remark: string
  enteredOn: Date
  paymentMode: PaymentModes
  balanceOnEntry: number
}

export interface IEntryState {
  entries?: IEntry[]
}

export interface IEntryActions {
  addEntry: (entry: IEntry) => void
}
