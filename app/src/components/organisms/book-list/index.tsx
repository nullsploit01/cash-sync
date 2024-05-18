import { Plus } from '@tamagui/lucide-icons'
import React from 'react'
import { Text, View, XStack } from 'tamagui'

import PressableText from 'src/components/atoms/pressable-text'
import BookListItem from 'src/components/molecules/book-list-item'
import { IBookListProps } from 'src/types/components/organisms'

const BookList = ({ books }: IBookListProps) => {
  return (
    <View margin="$3">
      <XStack justifyContent="space-between" alignItems="center">
        <Text theme="alt1" fontWeight="$5" fontSize="$4">
          Your Books
        </Text>
        <PressableText
          borderWidth="$1"
          borderColor="$blue10"
          padding="$1"
          borderRadius="$10"
          endIcon={<Plus color="$blue10" />}
        >
          <Text color="$blue10" fontSize="$5">
            Create Book
          </Text>
        </PressableText>
      </XStack>
      {books.map((book) => {
        return <BookListItem book={book} key={book.id} />
      })}
    </View>
  )
}

export default BookList
