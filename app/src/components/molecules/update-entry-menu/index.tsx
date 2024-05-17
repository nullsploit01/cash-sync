import { router } from 'expo-router'
import React, { Fragment } from 'react'
import { Button, View } from 'tamagui'

import { IUpdateEntryMenuProps } from 'src/types/components/molecules'

const UpdateEntryMenu = ({ entry, entryType }: IUpdateEntryMenuProps) => {
  const onUpdate = () => {
    router.back()
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
