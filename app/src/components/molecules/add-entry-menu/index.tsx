import { router } from 'expo-router'
import { Button, XStack } from 'tamagui'

import { EntryTypes } from 'src/constants/entry-types'
import { Routes } from 'src/constants/routes'
import { AddEntryTypes } from 'src/types/components/molecules'

const AddEntryMenu = () => {
  const handleEntryButtonPress = (entryType: AddEntryTypes) => {
    router.navigate({ pathname: Routes.AddEntryPage.link, params: { entryType } })
  }

  return (
    <XStack justifyContent="space-between" padding={20} backgroundColor="#FEFBF6">
      <Button width="45%" onPress={() => handleEntryButtonPress(EntryTypes.cashIn)} size="$5">
        Cash In
      </Button>
      <Button width="45%" onPress={() => handleEntryButtonPress(EntryTypes.cashOut)} size="$5">
        Cash Out
      </Button>
    </XStack>
  )
}

export default AddEntryMenu
