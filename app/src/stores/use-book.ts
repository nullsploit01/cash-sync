import { create } from 'zustand'

import { EntryTypes } from 'src/constants/entry'
import { bookService } from 'src/services/api/book'
import { entryService } from 'src/services/api/entry'
import { IBook, IEntry } from 'src/types/models'
import { IBookStoreActions, IBookStoreState } from 'src/types/stores'
import { generateRandomId } from 'src/utils/general'

const useBookStore = create<IBookStoreState & IBookStoreActions>((set, get) => ({
  books: [],
  entries: [],
  currentBook: null,
  loading: false,
  loadingCount: 0,

  addBook: async (bookName: string) => {
    try {
      get().setLoading(true)
      const { data } = await bookService.addBook(bookName)
      set((state) => ({ books: [data, ...state.books] }))
    } finally {
      get().setLoading(false)
    }
  },

  getBooks: async () => {
    try {
      get().setLoading(true)
      const { data } = await bookService.getBooks()
      set({ books: data ?? [] })
    } finally {
      get().setLoading(false)
    }
  },

  getEntries: async () => {
    if (get().currentBook) {
      try {
        get().setLoading(true)
        const { data } = await entryService.getEntries(get().currentBook.id)
        set({ entries: data ?? [] })
      } finally {
        get().setLoading(false)
      }
    }
  },

  setCurrentBook: async (id: string) => {
    const currentBook = get().books.find((b) => b.id == id)
    set({ currentBook })
  },

  updateCurrentBookBalance: () => {
    let totalIn: number = 0
    let totalOut: number = 0

    get().entries.map((e) => {
      if (e.type === EntryTypes.CASH_IN) {
        totalIn += e.amount
      } else if (e.type === EntryTypes.CASH_OUT) {
        totalOut += e.amount
      }
    })

    const filteredBooks = get().books.filter((b) => b.id != get().currentBook.id)
    const updatedCurrentBook: IBook = {
      ...get().currentBook,
      totalIn,
      totalOut,
      balance: totalIn - totalOut,
      updatedAt: new Date()
    }

    set(() => ({
      currentBook: updatedCurrentBook,
      books: [...filteredBooks, updatedCurrentBook]
    }))
  },

  editBook: async (book: IBook) => {
    try {
      get().setLoading(true)
      const { data } = await bookService.updateBook(book)
      const filteredBooks = get().books.filter((b) => b.id != data.id)
      set({ books: [data, ...filteredBooks] })
    } finally {
      get().setLoading(false)
    }
  },

  removeBook: async (id: string) => {
    try {
      get().setLoading(true)
      const filteredBooks = get().books.filter((b) => b.id != id)
      set({ books: [...filteredBooks] })
      await bookService.deleteBook(id)
    } finally {
      get().setLoading(false)
    }
  },

  addEntry: async (entry: IEntry) => {
    if (get().currentBook) {
      set((s) => ({
        entries: [
          {
            ...entry,
            enteredOn: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
            id: generateRandomId()
          },
          ...s.entries
        ]
      }))
      const { data } = await entryService.addEntry(get().currentBook.id, entry)
      set((s) => ({ entries: [data, ...s.entries] }))
    }
  },

  editEntry: async (entry: IEntry) => {
    if (get().currentBook) {
      const filteredEntries = get().entries.filter((e) => e.id != entry.id)
      set(() => ({ entries: [entry, ...filteredEntries] }))
      const { data } = await entryService.updateEntry(get().currentBook.id, entry)
      set(() => ({ entries: [data, ...filteredEntries] }))
    }
  },

  removeEntry: async (id: string) => {
    if (get().currentBook) {
      const filteredEntries = get().entries.filter((e) => e.id != id)
      set(() => ({ entries: [...filteredEntries] }))
      get().updateCurrentBookBalance()

      await entryService.deleteEntry(get().currentBook.id, id)
    }
  },

  setLoading: (value: boolean) => {
    set((state) => {
      const newLoadingCount = state.loadingCount + (value ? 1 : -1)
      return {
        loading: newLoadingCount > 0,
        loadingCount: newLoadingCount
      }
    })
  }
}))

export default useBookStore
