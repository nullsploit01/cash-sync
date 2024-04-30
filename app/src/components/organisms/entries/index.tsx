import { router } from 'expo-router'
import { View } from 'tamagui'

import EntryCard from 'src/components/molecules/entry-card'
import { Routes } from 'src/constants/routes'
import useEntryStore from 'src/stores/use-entry'
import { IEntry } from 'src/types/stores'

const Entries = () => {
  const { entries } = useEntryStore()

  const handleEntryPress = (entry: IEntry) => {
    router.navigate({ pathname: Routes.EntryPage.link, params: { id: entry.id } })
  }

  return (
    <View marginBottom="$15">
      {entries.map((entry, index) => {
        return (
          <View onPress={() => handleEntryPress(entry)} key={index} marginBottom="$3">
            <EntryCard entry={entry} />
          </View>
        )
      })}
    </View>
  )
}

export default Entries
