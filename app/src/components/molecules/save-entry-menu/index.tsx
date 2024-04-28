import { Button, XStack } from 'tamagui'

const SaveEntryMenu = () => {
  return (
    <XStack justifyContent="space-between" padding={20} backgroundColor="#FEFBF6">
      <Button width="55%" size="$5">
        Save & Add New
      </Button>
      <Button width="35%" size="$5">
        Save
      </Button>
    </XStack>
  )
}

export default SaveEntryMenu
