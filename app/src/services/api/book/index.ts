import { IBook } from 'src/types/models'

import { httpClient } from '..'

export const bookService = {
  getBooks: async () => {
    return await httpClient.get<IBook[]>('/books')
  },

  addBook: async (name: string) => {
    return await httpClient.post<IBook>('/books', { name })
  }
}
