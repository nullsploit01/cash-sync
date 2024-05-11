import { useSession } from '@clerk/clerk-expo'
import axios, { AxiosError, AxiosResponse, HttpStatusCode, InternalAxiosRequestConfig } from 'axios'
import { FC, PropsWithChildren, useEffect, useState } from 'react'

import { Environment } from 'src/config/environment'
import { useNotification } from 'src/hooks/use-notification'

export const httpClient = axios.create({
  baseURL: Environment.API_URL
})

export const HttpInterceptor: FC<PropsWithChildren> = ({ children }) => {
  const { session, isLoaded } = useSession()
  const { showNotification } = useNotification()

  const [isMounted, setIsMounted] = useState(false)

  const getDescription = (data: any) => {
    return typeof data?.error === 'string' ? data.error : 'Something went wrong! Please try again'
  }

  useEffect(() => {
    const requestInterceptor = async (request: InternalAxiosRequestConfig) => {
      if (isMounted) {
        const token = await session.getToken()

        if (token) {
          request.headers.Authorization = `Bearer ${token}`
        }
      }

      return request
    }

    const responseInterceptor = (response: AxiosResponse) => {
      return response
    }

    const errorInterceptor = (error: AxiosError) => {
      switch (error.response?.status) {
        case HttpStatusCode.BadRequest: {
          showNotification({
            title: 'Bad Request',
            message: getDescription(error.response?.data),
            type: 'error'
          })
          break
        }

        case HttpStatusCode.NotFound: {
          showNotification({
            title: 'Not Found',
            message: getDescription(error.response?.data),
            type: 'error'
          })
          break
        }

        case HttpStatusCode.InternalServerError: {
          showNotification({
            title: 'Internal Server Error',
            message: getDescription(error.response?.data),
            type: 'error'
          })
          break
        }

        default: {
          showNotification({
            title: 'Oops?',
            message: getDescription(error.response?.data),
            type: 'error'
          })
          break
        }
      }

      return Promise.reject(error)
    }

    const requestInterceptorInstance = httpClient.interceptors.request.use(requestInterceptor)
    const responseInterceptorInstance = httpClient.interceptors.response.use(
      responseInterceptor,
      errorInterceptor
    )

    setIsMounted(true)

    return () => {
      httpClient.interceptors.request.eject(requestInterceptorInstance)
      httpClient.interceptors.response.eject(responseInterceptorInstance)
    }
  }, [isMounted, session])

  if (!isLoaded) {
    return null
  }

  return isMounted ? children : null
}
