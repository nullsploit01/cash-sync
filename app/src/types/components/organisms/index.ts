import { Dispatch, SetStateAction } from 'react'

import { IEntry } from 'src/types/stores'

export interface IEntryFormProps {
  entry: IEntry
  setEntry: Dispatch<SetStateAction<IEntry>>
  validation: IEntryFormValidation
}

export interface IEntryFormValidation {
  amount: boolean
}
