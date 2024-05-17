import { router } from 'expo-router'
import React, { Fragment } from 'react'
import { Button, View } from 'tamagui'

import Loading from 'src/components/organisms/loading'
import useBookStore from 'src/stores/use-book'
import { IUpdateEntryMenuProps } from 'src/types/components/molecules'

const UpdateEntryMenu = ({ entry, entryType }: IUpdateEntryMenuProps) => {
  const { editEntry, loading } = useBookStore()

  const onUpdate = async () => {
    await editEntry(entry)
    router.back()
  }

  return (
    <Fragment>
      {loading || !entry ? (
        <Loading />
      ) : (
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
