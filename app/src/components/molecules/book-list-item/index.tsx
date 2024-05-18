import { Book, MoreVertical } from '@tamagui/lucide-icons'
import { router } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { Paragraph, Separator, Text, View, XStack, YStack } from 'tamagui'

import SheetPopover from 'src/components/atoms/popover'
import BookMenu from 'src/components/molecules/book-menu'
import { Routes } from 'src/constants/routes'
import { IBookListItemProps } from 'src/types/components/molecules'
import { getFormattedDate } from 'src/utils/date'

const BookListItem = ({ book }: IBookListItemProps) => {
  const handleBookPress = () => {
    router.navigate({ pathname: Routes.EntriesPage.link, params: { id: book.id } })
  }

  return (
    <View>
      <TouchableOpacity onPress={handleBookPress}>
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
            <Text fontSize="$5" marginRight="$3" color={book.balance < 0 ? 'red' : 'green'}>
              {book.balance}
            </Text>
            <SheetPopover keepChildrenMounted={false} content={<BookMenu book={book} />}>
              <MoreVertical />
            </SheetPopover>
          </XStack>
        </XStack>
      </TouchableOpacity>
      <Separator borderColor="$gray7" />
    </View>
  )
}

export default BookListItem
