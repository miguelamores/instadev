import { ISessionStoreType } from '@/types'
import { create } from 'zustand'

export const useSessionStore = create<ISessionStoreType>(set => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  setUser: user => set(() => ({ user })),
  setIsAuthenticated: isAuthenticated => set({ isAuthenticated }),
  setIsLoading: isLoading => set({ isLoading }),
  checkAuthUser: async () => false
}))
