import { IEntry } from 'src/types/models'

import { httpClient } from '..'

export const entryService = {
  getEntries: async (bookId: string) => {
    return await httpClient.get<IEntry[]>(`/books/${bookId}/entries`)
  },

  addEntry: async (bookId: string, entry: IEntry) => {
    return await httpClient.post<IEntry>(`/books/${bookId}/entries`, { ...entry })
  },

  updateEntry: async (bookId: string, entry: IEntry) => {
    return await httpClient.put<IEntry>(`/books/${bookId}/entries/${entry.id}`, { ...entry })
  }
}
