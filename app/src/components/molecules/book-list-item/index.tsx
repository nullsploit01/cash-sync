import { Book, MoreVertical } from '@tamagui/lucide-icons'
import { Separator, Text, View, XStack, YStack } from 'tamagui'

import { IBook } from 'src/types/models'
import { getFormattedDate } from 'src/utils/date'

const BookListItem = ({ ...props }: IBook) => {
  return (
    <View marginHorizontal="$3">
      <XStack marginVertical="$3" justifyContent="space-between" alignItems="center">
        <XStack alignItems="center">
          <View padding="$3" backgroundColor="$gray5" borderRadius="$10" marginRight="$3">
            <Book />
          </View>
          <YStack>
            <Text>{props.name}</Text>
            <Text theme="alt2">Updated on {getFormattedDate(props.updatedAt)}</Text>
          </YStack>
        </XStack>
        <XStack>
          <Text>{props.balance}</Text>
          <MoreVertical />
        </XStack>
      </XStack>
      <Separator borderColor="$gray7" />
    </View>
  )
}

export default BookListItem
