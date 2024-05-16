import { IEntry } from 'src/types/models'

import { httpClient } from '..'

export const entryService = {
  getEntries: async (bookId: string) => {
    return await httpClient.get<IEntry[]>(`/books/${bookId}/entries`)
  }
}
