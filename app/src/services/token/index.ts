import * as SecureStore from 'expo-secure-store'

import { cacheService } from 'src/services/cache'

export const tokenService = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key)
    } catch (err) {
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return await SecureStore.setItemAsync(key, value)
    } catch (err) {}
  },
  async clearToken() {
    return await cacheService.removeItem('__clerk_client_jwt')
  }
}
