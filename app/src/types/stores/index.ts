import { EntryTypes, PaymentModes } from 'src/constants/entry'
import { IEntry as Entry, IBook } from 'src/types/models'

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

export interface IBookStoreState {
  loading: boolean
  loadingCount: number
  books: IBook[]
  entries: Entry[]
  currentBook: IBook | null
}

export interface IBookStoreActions {
  getBooks: () => Promise<void>
  getEntries: () => Promise<void>
  setCurrentBook: (id: string) => void
  setLoading: (value: boolean) => void
}
