import { MoreVertical } from '@tamagui/lucide-icons'
import { TouchableOpacity } from 'react-native'
import { Adapt, Popover } from 'tamagui'

const BookMenu = () => {
  return (
    <Popover size="$1" allowFlip placement="top">
      <Popover.Trigger asChild>
        <TouchableOpacity>
          <MoreVertical />
        </TouchableOpacity>
      </Popover.Trigger>

      <Adapt when="sm">
        <Popover.Sheet modal dismissOnSnapToBottom>
          <Popover.Sheet.Frame padding="$4">
            <Adapt.Contents />
          </Popover.Sheet.Frame>
          <Popover.Sheet.Overlay animation="lazy" exitStyle={{ opacity: 0 }} />
        </Popover.Sheet>
      </Adapt>

      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        animation={[
          'quick',
          {
            opacity: {
              overshootClamping: true
            }
          }
        ]}
      >
        <Popover.Arrow borderWidth={1} borderColor="$borderColor" />
      </Popover.Content>
    </Popover>
  )
}

export default BookMenu
