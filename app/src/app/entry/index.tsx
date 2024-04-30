import { Stack, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View } from 'tamagui'

import Layout from 'src/components/layout'
import EntryDetailsCard from 'src/components/molecules/entry-details-card'
import useEntryStore from 'src/stores/use-entry'
import { IEntry } from 'src/types/stores'

const EntryPage = () => {
  const { entries } = useEntryStore()
  const { id } = useLocalSearchParams()

  const [_entry, setEntry] = useState<IEntry>()

  useEffect(() => {
    const entry = entries.find((e) => e.id === id)
    setEntry(entry)
  }, [])

  return (
    <Layout>
      <Stack.Screen options={{ headerTitle: 'Entry Details' }} />
      {_entry && (
        <View margin="$3">
          <EntryDetailsCard entry={_entry} />
        </View>
      )}
    </Layout>
  )
}

export default EntryPage
