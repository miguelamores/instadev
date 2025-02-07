import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useGetCurrentUser } from './useGetCurrentUser'

const useSession = () => {
  const location = useLocation()
  // const user = useSessionStore(state => state.user)
  // const setUser = useSessionStore(state => state.setUser)
  // const isAuthenticated = useSessionStore(state => state.isAuthenticated)
  // const setIsAuthenticated = useSessionStore(state => state.setIsAuthenticated)
  // const setIsLoading = useSessionStore(state => state.setIsLoading)
  const navigate = useNavigate()
  const { data: currentUser, isError, error } = useGetCurrentUser()
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

  useEffect(() => {
    if (isError && error.message === 'Unauthorized') {
      localStorage.removeItem('cookieFallback')
      navigate('/sign-in')
    }
  }, [isError])

  return {
    user: { ...currentUser, id: currentUser?.$id },
    isAuthenticated: !!currentUser,
    checkAuthUser: !!currentUser
  }
}

export default useSession
