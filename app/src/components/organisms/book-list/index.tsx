import React from 'react'
import { View } from 'tamagui'

import BookListItem from 'src/components/molecules/book-list-item'
import { IBookListProps } from 'src/types/components/organisms'

const BookList = ({ books }: IBookListProps) => {
  return (
    <View>
      {books.map((book) => {
        return <BookListItem book={book} key={book.id} />
      })}
    </View>
  )
}

export default BookList
