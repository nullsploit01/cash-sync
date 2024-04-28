export type EntryTypes = 'cash' | 'online'

export interface IEntry {
  amount: number
  remark: string
  enteredOn: Date
  type: EntryTypes
  balanceOnEntry: number
}

export interface IEntryState {
  entries?: IEntry[]
}

export interface IEntryActions {
  addEntry: (entry: IEntry) => void
}
