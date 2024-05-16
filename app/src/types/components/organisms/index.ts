import { Dispatch, SetStateAction } from 'react'

import { IBook, IEntry } from 'src/types/models'

export interface IEntryFormProps {
  entry: IEntry
  setEntry: Dispatch<SetStateAction<IEntry>>
  validation: IEntryFormValidation
}

export interface IEntryFormValidation {
  amount: boolean
}

export interface IBookListProps {
  books: IBook[]
}

export interface IEntriesProps {
  entries: IEntry[]
}
