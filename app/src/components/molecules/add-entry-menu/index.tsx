import { router } from 'expo-router'
import { Button, XStack } from 'tamagui'

import { Routes } from 'src/constants/routes'

import { styles } from './style'

const AddEntryMenu = () => {
  const handleEntryButtonPress = () => {
    router.navigate(Routes.AddEntryPage.link)
  }

  return (
    <XStack gap="$size.8" style={styles.container}>
      <Button onPress={handleEntryButtonPress} size="$5">
        Cash In
      </Button>
      <Button onPress={handleEntryButtonPress} size="$5">
        Cash Out
      </Button>
    </XStack>
  )
}

export default AddEntryMenu
