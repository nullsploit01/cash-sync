import { Dispatch, SetStateAction } from 'react'

import { IBook } from 'src/types/models'
import { IEntry } from 'src/types/stores'

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
