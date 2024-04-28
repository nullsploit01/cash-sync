import { IEntry } from 'src/types/stores'

export type AddEntryTypes = 'CASH_IN' | 'CASH_OUT'

export interface IEntryCardProps {
  entry: IEntry
}
