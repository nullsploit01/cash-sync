import { IBook } from 'src/types/models'

import { httpClient } from '..'

export const bookService = {
  getBooks: async () => {
    return await httpClient.get<IBook[]>('/books')
  },

  getBook: async (id: string) => {
    return await httpClient.get<IBook>(`/books/${id}`)
  },

  addBook: async (name: string) => {
    return await httpClient.post<IBook>('/books', { name })
  },

  updateBook: async (book: IBook) => {
    return await httpClient.put<IBook>(`/books/${book.id}`, { ...book })
  },

  deleteBook: async (id: string) => {
    return await httpClient.delete<IBook>(`/books/${id}`)
  }
}
