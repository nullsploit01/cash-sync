import { useSession } from '@clerk/clerk-expo'
import axios, { InternalAxiosRequestConfig } from 'axios'
import { FC, PropsWithChildren, useEffect, useState } from 'react'

import { Environment } from 'src/config/environment'

export const httpClient = axios.create({
  baseURL: Environment.API_URL
})

export const HttpInterceptor: FC<PropsWithChildren> = ({ children }) => {
  const { session, isLoaded } = useSession()
  const [isMounted, setIsMounted] = useState(false)

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

    const interceptor = httpClient.interceptors.request.use(requestInterceptor)

    setIsMounted(true)

    return () => {
      httpClient.interceptors.request.eject(interceptor)
    }
  }, [isMounted, session])

  if (!isLoaded) {
    return null
  }

  return isMounted ? children : null
}
