import { View } from 'tamagui'

import EntryCard from 'src/components/molecules/entry-card'
import useEntryStore from 'src/stores'

const Entries = () => {
  const { entries } = useEntryStore()

  return (
    <View marginBottom="$15">
      {entries.map((entry, index) => {
        return (
          <View marginBottom="$3">
            <EntryCard entry={entry} key={index} />
          </View>
        )
      })}
    </View>
  )
}

export default Entries
