import { AxiosError } from 'axios'
import { router } from 'expo-router'
import { Fragment } from 'react'
import { Button, XStack } from 'tamagui'

import Loading from 'src/components/organisms/loading'
import { EntryTypes } from 'src/constants/entry'
import { Routes } from 'src/constants/routes'
import { useNotification } from 'src/hooks/use-notification'
import useBookStore from 'src/stores/use-book'
import { ISaveEntryMenuProps } from 'src/types/components/molecules'

const SaveEntryMenu = ({ entry, entryType, setEntryValidation }: ISaveEntryMenuProps) => {
  const { showNotification } = useNotification()
  const { addEntry, loading, updateCurrentBookBalance } = useBookStore()

  const _addEntry = async () => {
    try {
      const _entry = {
        amount: entry.amount,
        remark: entry.remark,
        paymentMode: entry.paymentMode,
        type: entryType as EntryTypes,
        enteredOn: entry.enteredOn
      }

      await addEntry(_entry as any)
      updateCurrentBookBalance()
    } catch (error) {
      if (!(error instanceof AxiosError)) {
        showNotification({
          title: 'Oops!',
          message: 'Something went wrong, please try again',
          type: 'error'
        })
      }
    }
  }

  const onSave = () => {
    if (!entry.amount) {
      setEntryValidation({ amount: false })
      return
    }

    _addEntry()
    router.navigate({ pathname: Routes.EntriesPage.link })
  }

  const onSaveAndNew = () => {
    if (!entry.amount) {
      setEntryValidation({ amount: false })
      return
    }

    _addEntry()
    router.replace({ pathname: Routes.AddEntryPage.link, params: { entryType } })
  }

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <XStack justifyContent="space-between" padding={20} backgroundColor="#FEFBF6">
          <Button onPress={onSaveAndNew} width="55%" size="$5">
            Save & Add New
          </Button>
          <Button onPress={onSave} width="35%" size="$5">
            Save
          </Button>
        </XStack>
      )}
    </Fragment>
  )
}

export default SaveEntryMenu
