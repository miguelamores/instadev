import { QUERY_KEYS } from '@/consts'
import { usePostsContext } from '@/context/PostsContext'
import { createPost } from '@/services/appwrite'
import { INewPost } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const usePosts = () => {
  const queryClient = useQueryClient()
  const posts = usePostsContext()

  const postCreation = useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RECENT_POSTS] })
  })

  const recentPosts = useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: () => posts.getRecentPosts()
  })

  return { postCreation, recentPosts }
}

export default usePosts
