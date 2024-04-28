import { router } from 'expo-router'
import { Button, XStack } from 'tamagui'

import { EntryTypes } from 'src/constants/entry-types'
import { Routes } from 'src/constants/routes'
import { AddEntryTypes } from 'src/types/components/molecules'

import { styles } from './style'

const AddEntryMenu = () => {
  const handleEntryButtonPress = (entryType: AddEntryTypes) => {
    router.navigate({ pathname: Routes.AddEntryPage.link, params: { entryType } })
  }

  return (
    <XStack gap="$size.8" style={styles.container}>
      <Button onPress={() => handleEntryButtonPress(EntryTypes.cashIn)} size="$5">
        Cash In
      </Button>
      <Button onPress={() => handleEntryButtonPress(EntryTypes.cashOut)} size="$5">
        Cash Out
      </Button>
    </XStack>
  )
}

export default AddEntryMenu
