import { Check, Trash, X } from '@tamagui/lucide-icons'
import { Fragment, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Card, Text, View, XStack, YStack } from 'tamagui'

import IconButton from 'src/components/atoms/icon-button'
import InputField from 'src/components/atoms/input'
import PressableText from 'src/components/atoms/pressable-text'
import Loading from 'src/components/organisms/loading'
import useBookStore from 'src/stores/use-book'
import { IBookMenuProps } from 'src/types/components/molecules'

const BookMenu = ({ book }: IBookMenuProps) => {
  const { editBook, removeBook } = useBookStore()

  const [_book, setBook] = useState({
    name: book?.name
  })
  const [_editMode, setEditMode] = useState({ name: false })
  const [_showDeleteWarning, setShowDeleteWarning] = useState(false)

  useEffect(() => {
    setBook({ name: book?.name })
  }, [])

  const handleSaveName = async () => {
    setEditMode({ name: false })
    editBook({ ...book, name: _book.name })
  }

  const handleDiscardName = () => {
    setEditMode({ name: false })
    setBook({ name: book?.name })
  }

  const handleBookDeleteConfirmationPress = () => {
    setShowDeleteWarning(false)
    removeBook(book.id)
  }

  return (
    <Fragment>
      {!book ? (
        <Loading />
      ) : (
        <View margin="$3">
          <View
            borderBottomColor="black"
            borderBottomWidth="$0.25"
            paddingBottom="$3"
            marginVertical="$3"
          >
            <XStack alignItems="center" justifyContent="space-between">
              {_editMode.name ? (
                <Fragment>
                  <InputField
                    placeholder="Name"
                    value={_book.name}
                    width="70%"
                    onChange={(e) => {
                      const value = e.nativeEvent.text
                      setBook((prev) => {
                        return { ...prev, name: value }
                      })
                    }}
                  />
                  <XStack gap="$2">
                    <IconButton onPress={handleSaveName} icon={<Check color="green" />} />
                    <IconButton onPress={handleDiscardName} icon={<X color="red" />} />
                  </XStack>
                </Fragment>
              ) : (
                <Fragment>
                  <YStack>
                    <Text theme="alt1" fontSize="$4">
                      Book Name
                    </Text>
                    <Text fontSize="$6">{_book.name}</Text>
                  </YStack>
                  <PressableText
                    onPress={() => {
                      setEditMode({ name: true })
                    }}
                  >
                    <Text color="$blue11Dark">Change</Text>
                  </PressableText>
                </Fragment>
              )}
            </XStack>
          </View>
          <View>
            <TouchableOpacity onPress={() => setShowDeleteWarning(true)}>
              <XStack gap="$3" paddingVertical="$5" alignItems="center">
                <Trash color="red" size="$1.5" />
                <Text color="red" fontSize="$5">
                  Delete Book
                </Text>
              </XStack>
            </TouchableOpacity>
            {_showDeleteWarning && (
              <Card elevate>
                <View borderRadius="$2" borderColor="$gray2" borderWidth="$0.25" padding="$4">
                  <Text theme="alt1">
                    This book and all its entries will be permanently deleted. Are you sure you want
                    to continue?
                  </Text>
                  <XStack justifyContent="space-between" marginTop="$2" gap="$3">
                    <XStack backgroundColor="$gray5" padding="$2" width="45%">
                      <TouchableOpacity
                        onPress={() => setShowDeleteWarning(false)}
                        style={{ width: '100%', alignItems: 'center' }}
                      >
                        <Text theme="surface3">No</Text>
                      </TouchableOpacity>
                    </XStack>
                    <XStack backgroundColor="$gray5" padding="$2" width="45%">
                      <TouchableOpacity
                        onPress={handleBookDeleteConfirmationPress}
                        style={{ width: '100%', alignItems: 'center' }}
                      >
                        <Text theme="surface3">Yes</Text>
                      </TouchableOpacity>
                    </XStack>
                  </XStack>
                </View>
              </Card>
            )}
          </View>
        </View>
      )}
    </Fragment>
  )
}

export default BookMenu
