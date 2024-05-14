import React from 'react'
import { Text, View } from 'tamagui'

import BookListItem from 'src/components/molecules/book-list-item'
import { IBookListProps } from 'src/types/components/organisms'

const BookList = ({ books }: IBookListProps) => {
  return (
    <View margin="$3">
      <Text theme="alt1" fontWeight="$5" fontSize="$4">
        Your Books
      </Text>
      {books.map((book) => {
        return <BookListItem book={book} key={book.id} />
      })}
    </View>
  )
}

export default BookList
