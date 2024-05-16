import { AxiosError } from 'axios'
import { Stack, useLocalSearchParams } from 'expo-router'
import { Fragment, useEffect } from 'react'
import { Separator, XStack } from 'tamagui'

import Layout from 'src/components/layout'
import AddEntryMenu from 'src/components/molecules/add-entry-menu'
import BalanceCard from 'src/components/molecules/balance-card'
import Entries from 'src/components/organisms/entries'
import Loading from 'src/components/organisms/loading'
import { useNotification } from 'src/hooks/use-notification'
import useBookStore from 'src/stores/use-book'

const EntriesPage = () => {
  const { id } = useLocalSearchParams()
  const { showNotification } = useNotification()
  const { entries, setCurrentBook, getEntries, loading } = useBookStore()

  useEffect(() => {
    _getEntries()
  }, [])

  const _getEntries = async () => {
    if (typeof id === 'string') {
      try {
        await setCurrentBook(id)
        await getEntries()
      } catch (error) {
        if (!(error instanceof AxiosError)) {
          showNotification({
            title: 'Oops!',
            message: 'Something went wrong, please try again',
            type: 'error'
          })
        }
      }
    }
  }

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Layout footer={<AddEntryMenu />} protectedRoute>
          <Stack.Screen options={{ title: 'Your Expenses' }} />
          <XStack paddingHorizontal="$3" marginVertical="$3" alignSelf="center" width="100%">
            <BalanceCard />
          </XStack>
          <Separator marginVertical={10} />
          <Entries entries={entries} />
        </Layout>
      )}
    </Fragment>
  )
}

export default EntriesPage
