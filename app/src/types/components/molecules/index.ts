import { IBadgeProps } from 'src/types/components/atoms'
import { IEntry } from 'src/types/stores'

export interface IEntryCardProps {
  entry: IEntry
}

export interface ISaveEntryMenuProps {
  onSave?: () => void
  onSaveAndNew?: () => void
}

export interface IEntryDetailsCardProps {
  entry: IEntry
}

export interface IPaymentModeBadgeProps extends IBadgeProps {
  entry: IEntry
}
