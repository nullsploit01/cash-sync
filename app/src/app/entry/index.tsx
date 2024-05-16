import { Stack, useFocusEffect, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { Card, Text, View, XStack } from 'tamagui'

import Layout from 'src/components/layout'
import EntryDetailsCard from 'src/components/molecules/entry-details-card'
import useBookStore from 'src/stores/use-book'
import { IEntry } from 'src/types/models'
import { getFormattedDate, getFormattedTime } from 'src/utils/date'

const EntryPage = () => {
  const { entries } = useBookStore()
  const { id } = useLocalSearchParams()

  const [_entry, setEntry] = useState<IEntry>()

  useFocusEffect(() => {
    const entry = entries.find((e) => e.id === id)
    setEntry(entry)
  })

  return (
    <Layout protectedRoute>
      <Stack.Screen options={{ headerTitle: 'Entry Details' }} />
      {_entry && (
        <View>
          <View margin="$3">
            <EntryDetailsCard entry={_entry} />
          </View>
          <Card>
            <Card.Header>
              <XStack justifyContent="space-between" alignItems="center">
                <Text theme="alt1">Created By</Text>
                <Text fontWeight="800"> You</Text>
              </XStack>
              <XStack justifyContent="flex-end">
                <Text theme="alt2">
                  On {getFormattedDate(_entry.updatedAt)}, {getFormattedTime(_entry.updatedAt)}
                </Text>
              </XStack>
            </Card.Header>
          </Card>
        </View>
      )}
    </Layout>
  )
}

export default EntryPage
