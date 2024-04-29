import { Button, XStack } from 'tamagui'

import { ISaveEntryMenuProps } from 'src/types/components/molecules'

const SaveEntryMenu = ({ onSave, onSaveAndNew }: ISaveEntryMenuProps) => {
  return (
    <XStack justifyContent="space-between" padding={20} backgroundColor="#FEFBF6">
      <Button onPress={onSaveAndNew} width="55%" size="$5">
        Save & Add New
      </Button>
      <Button onPress={onSave} width="35%" size="$5">
        Save
      </Button>
    </XStack>
  )
}

export default SaveEntryMenu
