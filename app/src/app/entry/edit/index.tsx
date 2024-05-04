import { Stack, useLocalSearchParams } from 'expo-router'
import React, { Fragment, useEffect, useState } from 'react'
import { View } from 'tamagui'

import Layout from 'src/components/layout'
import UpdateEntryMenu from 'src/components/molecules/update-entry-menu'
import EntryForm from 'src/components/organisms/entry-form'
import useEntryStore from 'src/stores/use-entry'
import { IEntry } from 'src/types/stores'

const EditEntryPage = () => {
  const { entries } = useEntryStore()
  const { id } = useLocalSearchParams() as any

  const [_entryValidation, setEntryValidation] = useState({ amount: true })
  const [_entry, setEntry] = useState<IEntry>()

  useEffect(() => {
    const entry = entries.find((e) => e.id === id)
    setEntry(entry)
  }, [])

  return (
    <Fragment>
      {_entry && (
        <Layout
          protectedRoute
          footer={
            <UpdateEntryMenu
              entry={_entry}
              entryType={_entry?.type}
              setEntryValidation={setEntryValidation}
            />
          }
        >
          <Stack.Screen options={{ title: 'Edit Entry' }} />
          <View paddingHorizontal="$3">
            <EntryForm entry={_entry} setEntry={setEntry} validation={_entryValidation} />
          </View>
        </Layout>
      )}
    </Fragment>
  )
}

export default EditEntryPage
