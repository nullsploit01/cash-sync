import { TouchableOpacity } from 'react-native'
import { Adapt, Popover } from 'tamagui'

import { ISheetPopoverProps } from 'src/types/components/atoms'

const SheetPopover = ({ children, content, ...props }: ISheetPopoverProps) => {
  return (
    <Popover size="$1" allowFlip placement="top" {...props}>
      <Popover.Trigger asChild>
        <TouchableOpacity>{children}</TouchableOpacity>
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
        {content}
      </Popover.Content>
    </Popover>
  )
}

export default SheetPopover
