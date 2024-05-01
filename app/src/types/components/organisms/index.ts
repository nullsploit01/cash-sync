import { Dispatch, SetStateAction } from 'react'

import { IDatePickerTypes } from 'src/types/hooks'
import { IEntry } from 'src/types/stores'

export interface IEntryFormProps {
  entry: IEntry
  setEntry: Dispatch<SetStateAction<IEntry>>
  validation: IEntryFormValidation
  showDatepicker: (type: IDatePickerTypes) => void
}

export interface IEntryFormValidation {
  amount: boolean
}
