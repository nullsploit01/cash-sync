import React from 'react'
import { Button, View } from 'tamagui'

const UpdateEntryMenu = () => {
  const onUpdate = () => {}
  return (
    <View onPress={onUpdate} padding="$3">
      <Button backgroundColor="$gray8">UPDATE</Button>
    </View>
  )
}

export default UpdateEntryMenu
