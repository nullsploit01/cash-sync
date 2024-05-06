import { httpClient } from 'src/services/api'
import { IUser } from 'src/types/models'
import { IUpdateUserRequest } from 'src/types/services/api'

export const authService = {
  getUser: async (id: string) => {
    return await httpClient.get<IUser>(`/auth/users/${id}`)
  },

  updateUser: async (id: string, params: IUpdateUserRequest) => {
    return await httpClient.put<IUser>(`/auth/users/${id}`, {
      first_name: params.first_name,
      last_name: params.last_name
    })
  }
}
