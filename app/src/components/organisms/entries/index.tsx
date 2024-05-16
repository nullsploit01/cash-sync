import { router } from 'expo-router'
import { View } from 'tamagui'

import EntryCard from 'src/components/molecules/entry-card'
import { Routes } from 'src/constants/routes'
import { IEntriesProps } from 'src/types/components/organisms'
import { IEntry } from 'src/types/models'

const Entries = ({ entries }: IEntriesProps) => {
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
