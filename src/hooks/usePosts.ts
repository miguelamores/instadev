import { QUERY_KEYS } from '@/consts'
import { createPost, getRecentPosts } from '@/services/appwrite'
import { INewPost } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const usePosts = () => {
  const queryClient = useQueryClient()

  const postCreation = useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RECENT_POSTS] })
  })

  const recentPosts = useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: () => getRecentPosts()
  })

  return { postCreation, recentPosts }
}

export default usePosts
