import { useSession } from '@clerk/clerk-expo'
import axios, { InternalAxiosRequestConfig } from 'axios'
import { FC, PropsWithChildren, useEffect, useState } from 'react'

import { Environment } from 'src/config/environment'

export const httpClient = axios.create({
  baseURL: Environment.API_URL
})

export const HttpInterceptor: FC<PropsWithChildren> = ({ children }) => {
  const { session } = useSession()
  const [_isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const requestInterceptor = async (request: InternalAxiosRequestConfig) => {
      const token = await session.getToken()

      if (token) {
        request.headers.Authorization = `Bearer ${token}`
      }

      return request
    }

    setIsMounted(true)
    const interceptor = httpClient.interceptors.request.use(requestInterceptor)
    return () => httpClient.interceptors.response.eject(interceptor)
  }, [])

  return _isMounted && children
}
