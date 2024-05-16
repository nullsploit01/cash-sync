import { useUser } from '@clerk/clerk-expo'
import { AxiosError } from 'axios'
import { Stack } from 'expo-router'
import { Fragment, useEffect } from 'react'

import Layout from 'src/components/layout'
import BookList from 'src/components/organisms/book-list'
import Loading from 'src/components/organisms/loading'
import { useNotification } from 'src/hooks/use-notification'
import useBookStore from 'src/stores/use-book'
import { getGreeting } from 'src/utils/date'

const HomePage = () => {
  const { user } = useUser()
  const { showNotification } = useNotification()
  const { loading, books, getBooks } = useBookStore()

  useEffect(() => {
    try {
      getBooks()
    } catch (error) {
      if (!(error instanceof AxiosError)) {
        showNotification({
          title: 'Oops!',
          message: 'Something went wrong, please try again',
          type: 'error'
        })
      }
    }
  }, [])

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerTitle: getGreeting(user?.firstName ?? 'Your Books'),
          headerTitleStyle: { fontWeight: '400' }
        }}
      />
      {loading ? (
        <Loading />
      ) : (
        <Layout protectedRoute>
          <BookList books={books} />
        </Layout>
      )}
    </Fragment>
  )
}

export default HomePage
