import { getCurrentUser } from '@/services/appwrite'
import { useSessionStore } from '@/store/session'
import { getErrorMessage } from '@/utils'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const useSession = () => {
  const user = useSessionStore(state => state.user)
  const setUser = useSessionStore(state => state.setUser)
  const isAuthenticated = useSessionStore(state => state.isAuthenticated)
  const setIsAuthenticated = useSessionStore(state => state.setIsAuthenticated)
  const setIsLoading = useSessionStore(state => state.setIsLoading)
  const navigate = useNavigate()

  const checkAuthUser = async () => {
    try {
      setIsLoading(true)
      const currentUser = await getCurrentUser()

      if (currentUser) {
        setUser({
          id: currentUser.$id,
          email: currentUser.email,
          username: currentUser.username,
          name: currentUser.name,
          imageUrl: currentUser.imageUrl,
          bio: currentUser.bio
        })
        setIsAuthenticated(true)
        return true
      }

      return false
    } catch (error) {
      getErrorMessage(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const cookieFallback = localStorage.getItem('cookieFallback')
    if (
      cookieFallback === null ||
      cookieFallback === undefined ||
      cookieFallback === '[]'
    )
      navigate('/sign-in')

    checkAuthUser()
  }, [])

  return { user, isAuthenticated }
}

export default useSession
