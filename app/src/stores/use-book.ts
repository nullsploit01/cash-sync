import { create } from 'zustand'

import { bookService } from 'src/services/api/book'
import { entryService } from 'src/services/api/entry'
import { IBookStoreActions, IBookStoreState } from 'src/types/stores'

const useBookStore = create<IBookStoreState & IBookStoreActions>((set, get) => ({
  books: [],
  entries: [],
  currentBook: null,
  loading: false,
  loadingCount: 0,

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
    try {
      get().setLoading(true)
      const { data } = await bookService.getBook(id)
      set({ currentBook: data })
    } finally {
      get().setLoading(false)
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
