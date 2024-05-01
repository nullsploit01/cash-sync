import { router } from 'expo-router'
import { Button, XStack } from 'tamagui'

import { EntryTypes } from 'src/constants/entry'
import { Routes } from 'src/constants/routes'
import useEntryStore from 'src/stores/use-entry'
import { ISaveEntryMenuProps } from 'src/types/components/molecules'
import { IEntry } from 'src/types/stores'
import { generateRandomId } from 'src/utils/general'

const SaveEntryMenu = ({ entry, entryType, setEntryValidation }: ISaveEntryMenuProps) => {
  const { addEntry, netWorth } = useEntryStore()

  const _addEntry = () => {
    const _entry: IEntry = {
      id: generateRandomId(),
      amount: entry.amount,
      remark: entry.remark,
      enteredOn: entry.enteredOn,
      paymentMode: entry.paymentMode,
      balanceOnEntry: getBalanceOnEntry(),
      type: +entryType as EntryTypes
    }

    addEntry(_entry)
  }

  const getBalanceOnEntry = () => {
    if (!entry?.amount) {
      return 0
    }

    if (entryType === EntryTypes.CASH_OUT) {
      return netWorth.netBalance - +entry.amount
    }

    return netWorth.netBalance + +entry.amount
  }

  const onSave = () => {
    if (!entry.amount?.trim()) {
      setEntryValidation({ amount: false })
      return
    }

    _addEntry()
    router.navigate({ pathname: Routes.HomePage.link })
  }

  const onSaveAndNew = () => {
    if (!entry.amount?.trim()) {
      setEntryValidation({ amount: false })
      return
    }

    _addEntry()
    router.replace({ pathname: Routes.AddEntryPage.link, params: { entryType } })
  }

  return (
    <XStack justifyContent="space-between" padding={20} backgroundColor="#FEFBF6">
      <Button onPress={onSaveAndNew} width="55%" size="$5">
        Save & Add New
      </Button>
      <Button onPress={onSave} width="35%" size="$5">
        Save
      </Button>
    </XStack>
  )
}

export default SaveEntryMenu
