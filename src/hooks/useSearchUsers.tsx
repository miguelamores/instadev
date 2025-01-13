import { QUERY_KEYS } from '@/consts'
import { searchUsers } from '@/services/appwrite'
import { useInfiniteQuery } from '@tanstack/react-query'

export function useSearchUsers(searchUser: string) {
  const result = useInfiniteQuery({
    queryKey: [QUERY_KEYS.SEARCH_USERS, searchUser],
    initialPageParam: '0',
    queryFn: ({ pageParam }) =>
      searchUsers({ pageParam: pageParam, searchUser }),
    getNextPageParam: lastPage => {
      if (lastPage.documents.length === 0) {
        return undefined
      }
      const lastId = lastPage?.documents.at(-1)?.$id
      return lastId
    }
  })

  return result
}
