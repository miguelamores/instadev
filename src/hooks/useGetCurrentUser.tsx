import { QUERY_KEYS } from '@/consts'
import { getCurrentUser } from '@/services/appwrite'
import { useQuery } from '@tanstack/react-query'

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser
  })
}
