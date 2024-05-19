import { IBook, IEntry } from 'src/types/models'

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
  entries: IEntry[]
  currentBook: IBook | null
}

export interface IBookStoreActions {
  addBook: (bookName: string) => Promise<void>
  getBooks: () => Promise<void>
  editBook: (book: IBook) => Promise<void>
  removeBook: (id: string) => void
  getEntries: () => Promise<void>
  setCurrentBook: (id: string) => Promise<void>
  addEntry: (entry: IEntry) => Promise<void>
  editEntry: (entry: IEntry) => Promise<void>
  removeEntry: (id: string) => Promise<void>
  updateCurrentBookBalance: () => void
  setLoading: (value: boolean) => void
}
