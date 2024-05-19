import { create } from 'zustand'

import { EntryTypes } from 'src/constants/entry'
import { bookService } from 'src/services/api/book'
import { entryService } from 'src/services/api/entry'
import { IBook, IEntry } from 'src/types/models'
import { IBookStoreActions, IBookStoreState } from 'src/types/stores'

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

    set((s) => ({
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
      try {
        get().setLoading(true)
        const { data } = await entryService.addEntry(get().currentBook.id, entry)
        set((state) => ({ entries: [data, ...state.entries] }))
      } finally {
        get().setLoading(false)
      }
    }
  },

  editEntry: async (entry: IEntry) => {
    if (get().currentBook) {
      try {
        get().setLoading(true)
        const { data } = await entryService.updateEntry(get().currentBook.id, entry)
        const filteredEntries = get().entries.filter((e) => e.id != entry.id)
        set(() => ({ entries: [data, ...filteredEntries] }))
      } finally {
        get().setLoading(false)
      }
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
