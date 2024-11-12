import { QUERY_KEYS } from '@/consts'
import { usePostsContext } from '@/context/PostsContext'
import { createPost } from '@/services/appwrite'
import { INewPost } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useCreatePost = () => {
  const queryClient = useQueryClient()

  const postCreation = useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RECENT_POSTS] })
  })

  return { postCreation }
}

export const useGetRecentPosts = () => {
  const getRecentPosts = usePostsContext()

  const recentPosts = useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: () => getRecentPosts()
  })

  return { recentPosts }
}
