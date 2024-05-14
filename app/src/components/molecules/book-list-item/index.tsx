import { Book, MoreVertical } from '@tamagui/lucide-icons'
import { Separator, Text, View, XStack, YStack } from 'tamagui'

import { IBookListItemProps } from 'src/types/components/molecules'
import { getFormattedDate } from 'src/utils/date'

const BookListItem = ({ book }: IBookListItemProps) => {
  return (
    <View marginHorizontal="$3">
      <XStack marginVertical="$3" justifyContent="space-between" alignItems="center">
        <XStack alignItems="center">
          <View padding="$3" backgroundColor="$gray5" borderRadius="$10" marginRight="$3">
            <Book />
          </View>
          <YStack>
            <Text>{book.name}</Text>
            <Text theme="alt2">Updated on {getFormattedDate(book.updatedAt)}</Text>
          </YStack>
        </XStack>
        <XStack>
          <Text>{book.balance}</Text>
          <MoreVertical />
        </XStack>
      </XStack>
      <Separator borderColor="$gray7" />
    </View>
  )
}

export default BookListItem
