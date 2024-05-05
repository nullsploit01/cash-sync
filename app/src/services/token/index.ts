import * as SecureStore from 'expo-secure-store'

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

  async clearToken(key = '__clerk_client_jwt') {
    return await SecureStore.deleteItemAsync(key)
  }
}
