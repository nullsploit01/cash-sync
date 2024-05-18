import { Plus } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { Button, Text, View, XStack } from 'tamagui'

import InputField from 'src/components/atoms/input'
import SheetPopover from 'src/components/atoms/popover'
import BookListItem from 'src/components/molecules/book-list-item'
import useBookStore from 'src/stores/use-book'
import { IBookListProps } from 'src/types/components/organisms'

const BookList = ({ books }: IBookListProps) => {
  const { addBook } = useBookStore()

  const [_bookName, setBookName] = useState('')

  const handleAddNewBookPress = () => {
    if (!_bookName.trim()) {
      return
    }

    addBook(_bookName)
  }

  return (
    <View margin="$3">
      <XStack justifyContent="space-between" alignItems="center">
        <Text theme="alt1" fontWeight="$5" fontSize="$4">
          Your Books
        </Text>
        <SheetPopover
          keepChildrenMounted={false}
          content={
            <View>
              <View borderBottomWidth="$0.5" marginBottom="$5" paddingBottom="$5">
                <Text fontSize="$5">Add New Book</Text>
              </View>
              <InputField
                placeholder="Book Name"
                value={_bookName}
                onChange={(e) => {
                  const value = e.nativeEvent.text
                  setBookName(value)
                }}
              />
              <View paddingVertical="$3" width="100%">
                <Button
                  onPress={handleAddNewBookPress}
                  disabled={!_bookName.trim()}
                  backgroundColor="$gray5"
                >
                  <Plus />
                  ADD NEW BOOK
                </Button>
              </View>
            </View>
          }
        >
          <View
            display="flex"
            flexDirection="row"
            alignItems="center"
            borderWidth="$0.75"
            borderColor="$blue10"
            paddingVertical="$1"
            paddingHorizontal="$1.5"
            borderRadius="$10"
          >
            <Text color="$blue10" fontSize="$5">
              Create Book
            </Text>
            <Plus color="$blue10" />
          </View>
        </SheetPopover>
      </XStack>
      {books.map((book) => {
        return <BookListItem book={book} key={book.id} />
      })}
    </View>
  )
}

export default BookList
