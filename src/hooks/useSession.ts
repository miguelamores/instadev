import { getCurrentUser } from '@/services/appwrite'
import { useSessionStore } from '@/store/session'
import { getErrorMessage } from '@/utils'
import { useCallback, useEffect } from 'react'
import { useNavigate, use, useLocation } from 'react-router-dom'
import { useGetCurrentUser } from './useGetCurrentUser'

const useSession = () => {
  const location = useLocation()
  // const user = useSessionStore(state => state.user)
  // const setUser = useSessionStore(state => state.setUser)
  // const isAuthenticated = useSessionStore(state => state.isAuthenticated)
  // const setIsAuthenticated = useSessionStore(state => state.setIsAuthenticated)
  // const setIsLoading = useSessionStore(state => state.setIsLoading)
  const navigate = useNavigate()
  const { data: currentUser } = useGetCurrentUser()
  console.log(currentUser)

  // const checkAuthUser = () => {
  //   try {
  //     setIsLoading(true)
  //     // const currentUser = await getCurrentUser()

  //     if (currentUser) {
  //       setUser({
  //         id: currentUser.$id,
  //         email: currentUser.email,
  //         username: currentUser.username,
  //         name: currentUser.name,
  //         imageUrl: currentUser.imageUrl,
  //         bio: currentUser.bio
  //       })
  //       setIsAuthenticated(true)
  //       return true
  //     }
  //     setIsAuthenticated(false)
  //     return false
  //   } catch (error) {
  //     getErrorMessage(error)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  useEffect(() => {
    const cookieFallback = localStorage.getItem('cookieFallback')
    console.log({ cookieFallback })
    if (
      cookieFallback === null ||
      cookieFallback === undefined ||
      cookieFallback === '[]'
    ) {
      return navigate('/sign-in')
    } else if (
      cookieFallback &&
      (location.pathname === '/sign-in' || location.pathname === '/sign-up')
    ) {
      return navigate('/')
    }

    // checkAuthUser()
  }, [])

  return {
    user: { ...currentUser, id: currentUser?.$id },
    isAuthenticated: !!currentUser,
    checkAuthUser: !!currentUser
  }
}

export default useSession
