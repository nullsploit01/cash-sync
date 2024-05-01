import { router } from 'expo-router'
import React, { Fragment, useRef } from 'react'
import { Button, View } from 'tamagui'

import { EntryTypes } from 'src/constants/entry'
import { Routes } from 'src/constants/routes'
import useEntryStore from 'src/stores/use-entry'
import { IUpdateEntryMenuProps } from 'src/types/components/molecules'

const UpdateEntryMenu = ({ entry, entryType }: IUpdateEntryMenuProps) => {
  const prevEntry = useRef(entry)
  const { updateEntry, netWorth } = useEntryStore()

  const onUpdate = () => {
    updateEntry({ ...entry, balanceOnEntry: getBalanceOnEntry() })
    router.replace({ pathname: Routes.EntryPage.link, params: { id: entry.id } })
  }

  const getBalanceOnEntry = () => {
    if (!entry?.amount) {
      return 0
    }

    if (entryType === EntryTypes.CASH_OUT) {
      return netWorth.netBalance - +entry.amount - +prevEntry.current.amount
    }

    return netWorth.netBalance + +entry.amount - +prevEntry.current.amount
  }

  return (
    <Fragment>
      {entry && (
        <View padding="$3">
          <Button onPress={onUpdate} backgroundColor="$gray8">
            UPDATE
          </Button>
        </View>
      )}
    </Fragment>
  )
}

export default UpdateEntryMenu
