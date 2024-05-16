import { Stack, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { View } from 'tamagui'

import Layout from 'src/components/layout'
import SaveEntryMenu from 'src/components/molecules/save-entry-menu'
import EntryForm from 'src/components/organisms/entry-form'
import { EntryTypes, PaymentModes } from 'src/constants/entry'
import { IEntry } from 'src/types/models'

const AddEntryPage = () => {
  const { entryType } = useLocalSearchParams() as any

  const [_title, setTitle] = useState({ title: '', color: '' })
  const [_entryValidation, setEntryValidation] = useState({ amount: true })
  const [_entry, setEntry] = useState<IEntry>({ paymentMode: PaymentModes.ONLINE } as IEntry)

  useEffect(() => {
    switch (entryType) {
      case EntryTypes.CASH_IN:
        setTitle({ title: 'Add Cash In Entry', color: 'green' })
        break

      case EntryTypes.CASH_OUT:
        setTitle({ title: 'Add Cash Out Entry', color: 'red' })
        break

      default:
        setTitle({ title: 'Add Cash In Entry', color: 'black' })
        break
    }
  }, [])

  useEffect(() => {
    setEntryValidation({ amount: true })
  }, [_entry])

  return (
    <Layout
      footer={
        <SaveEntryMenu
          entry={_entry}
          setEntryValidation={setEntryValidation}
          entryType={entryType}
        />
      }
      protectedRoute
    >
      <Stack.Screen options={{ title: _title.title, headerTitleStyle: { color: _title.color } }} />
      <View paddingHorizontal="$3">
        <EntryForm entry={_entry} setEntry={setEntry} validation={_entryValidation} />
      </View>
    </Layout>
  )
}

export default AddEntryPage
