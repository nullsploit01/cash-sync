import * as SecureStore from 'expo-secure-store'

export const cacheService = {
  async getItem(key: string) {
    try {
      return SecureStore.getItemAsync(key)
    } catch (err) {
      return null
    }
  },

  async setItem(key: string, value: unknown) {
    try {
      return SecureStore.setItemAsync(key, JSON.stringify(value))
    } catch (err) {
      return null
    }
  },

  async removeItem(key: string) {
    try {
      return SecureStore.deleteItemAsync(key)
    } catch (err) {
      return null
    }
  }
}
