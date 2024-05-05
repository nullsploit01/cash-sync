import { cacheService } from 'src/services/cache'

export const tokenService = {
  async getToken(key: string) {
    return await cacheService.getItem(key)
  },

  async saveToken(key: string, value: string) {
    return await cacheService.setItem(key, value)
  },

  async clearToken(key = '__clerk_client_jwt') {
    return await cacheService.removeItem(key)
  }
}
