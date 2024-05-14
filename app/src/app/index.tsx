import { useUser } from '@clerk/clerk-expo'
import { AxiosError } from 'axios'
import { Stack } from 'expo-router'
import { Fragment, useEffect, useState } from 'react'

import Layout from 'src/components/layout'
import BookList from 'src/components/organisms/book-list'
import Loading from 'src/components/organisms/loading'
import { useNotification } from 'src/hooks/use-notification'
import { bookService } from 'src/services/api/book'
import { IBook } from 'src/types/models'

const HomePage = () => {
  const { user } = useUser()
  const { showNotification } = useNotification()

  const [_loading, setLoading] = useState(false)
  const [_books, setBooks] = useState<IBook[]>([])

  useEffect(() => {
    getBooks()
  }, [])

  const getBooks = async () => {
    try {
      setLoading(true)
      const { data } = await bookService.getBooks()
      setBooks(data)
    } catch (error) {
      if (!(error instanceof AxiosError)) {
        showNotification({
          title: 'Oops!',
          message: 'Something went wrong, please try again',
          type: 'error'
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Fragment>
      <Stack.Screen options={{ headerTitle: 'Your' }} />
      {_loading ? (
        <Loading />
      ) : (
        <Layout protectedRoute>
          <BookList books={_books} />
        </Layout>
      )}
    </Fragment>
  )
}

export default HomePage
