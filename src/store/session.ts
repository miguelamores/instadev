import { ISessionStoreType } from '@/types'
import { create } from 'zustand'

const user = {
  id: '',
  name: '',
  username: '',
  email: '',
  imageUrl: '',
  bio: ''
}

export const useSessionStore = create<ISessionStoreType>(set => ({
  user,
  isLoading: false,
  isAuthenticated: false,
  setUser: user => set(() => ({ user })),
  setIsAuthenticated: isAuthenticated => set({ isAuthenticated }),
  setIsLoading: isLoading => set({ isLoading }),
  checkAuthUser: async () => true
}))
