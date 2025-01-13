import { QUERY_KEYS } from '@/consts'
import { getSavedPosts } from '@/services/appwrite'
import { useQuery } from '@tanstack/react-query'
import useSession from './useSession'

export function useGetSavedPosts() {
  const { user } = useSession()

  return useQuery({
    queryKey: [QUERY_KEYS.GET_SAVED_POSTS, user.id],
    queryFn: () => getSavedPosts(user?.id)
  })
}
