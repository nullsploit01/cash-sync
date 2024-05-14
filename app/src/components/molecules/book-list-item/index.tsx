import { Book, MoreVertical } from '@tamagui/lucide-icons'
import { TouchableOpacity } from 'react-native'
import { Paragraph, Separator, Text, View, XStack, YStack } from 'tamagui'

import { IBookListItemProps } from 'src/types/components/molecules'
import { getFormattedDate } from 'src/utils/date'

const BookListItem = ({ book }: IBookListItemProps) => {
  return (
    <View>
      <XStack marginVertical="$3" justifyContent="space-between">
        <XStack alignItems="center">
          <View padding="$3" backgroundColor="$gray5" borderRadius="$10" marginRight="$3">
            <Book />
          </View>
          <YStack>
            <Paragraph fontWeight="700" fontSize="$5">
              {book.name}
            </Paragraph>
            <Text fontSize="$2" theme="alt2">
              Updated on {getFormattedDate(book.updatedAt)}
            </Text>
          </YStack>
        </XStack>
        <XStack marginTop="$2">
          <Text fontSize="$5" marginRight="$3">
            {book.balance}
          </Text>
          <TouchableOpacity>
            <MoreVertical />
          </TouchableOpacity>
        </XStack>
      </XStack>
      <Separator borderColor="$gray7" />
    </View>
  )
}

export default BookListItem
