import { router } from 'expo-router'
import { Button, XStack } from 'tamagui'

import { EntryTypes } from 'src/constants/entry'
import { Routes } from 'src/constants/routes'

const AddEntryMenu = () => {
  const handleEntryButtonPress = (entryType: EntryTypes) => {
    router.navigate({
      pathname: Routes.AddEntryPage.link,
      params: { entryType }
    })
  }

  return (
    <XStack justifyContent="space-between" padding={20} backgroundColor="#FEFBF6">
      <Button width="45%" onPress={() => handleEntryButtonPress(EntryTypes.CASH_IN)} size="$5">
        Cash In
      </Button>
      <Button width="45%" onPress={() => handleEntryButtonPress(EntryTypes.CASH_OUT)} size="$5">
        Cash Out
      </Button>
    </XStack>
  )
}

export default AddEntryMenu
