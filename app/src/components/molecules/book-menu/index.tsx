import { Check } from '@tamagui/lucide-icons'
import { Fragment, useEffect, useState } from 'react'
import { Text, View, XStack, YStack } from 'tamagui'

import IconButton from 'src/components/atoms/icon-button'
import InputField from 'src/components/atoms/input'
import PressableText from 'src/components/atoms/pressable-text'
import Loading from 'src/components/organisms/loading'
import useBookStore from 'src/stores/use-book'
import { IBookMenuProps } from 'src/types/components/molecules'

const BookMenu = ({ book }: IBookMenuProps) => {
  const { editBook } = useBookStore()

  const [_book, setBook] = useState({
    name: book?.name
  })
  const [_editMode, setEditMode] = useState({ name: false })

  useEffect(() => {
    setBook({ name: book?.name })
  }, [])

  const handleSaveName = async () => {
    setEditMode({ name: false })
    editBook({ ...book, name: _book.name })
  }

  return (
    <Fragment>
      {!book ? (
        <Loading />
      ) : (
        <View margin="$3">
          <View borderBottomColor="black" borderBottomWidth="$0.25">
            <XStack alignItems="center" justifyContent="space-between" marginVertical="$3">
              {_editMode.name ? (
                <Fragment>
                  <InputField
                    placeholder="Name"
                    value={_book.name}
                    width="80%"
                    onChange={(e) => {
                      const value = e.nativeEvent.text
                      setBook((prev) => {
                        return { ...prev, name: value }
                      })
                    }}
                  />
                  <IconButton onPress={handleSaveName} icon={<Check />} />
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
        </View>
      )}
    </Fragment>
  )
}

export default BookMenu
