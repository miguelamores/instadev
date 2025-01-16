import { QUERY_KEYS } from '@/consts'
import { usePostsContext } from '@/context/PostsContext'
import {
  createPost,
  deletePost,
  getPostById,
  searchPosts,
  updatePost
} from '@/services/appwrite'
import { INewPost, IUpdatePost } from '@/types'
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

export const useCreatePost = () => {
  const queryClient = useQueryClient()

  const postCreation = useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RECENT_POSTS] })
  })

  return { postCreation }
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  const postCreation = useMutation({
    mutationFn: (post: IUpdatePost) => updatePost(post),
    onSuccess: post =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, post?.$id]
      })
  })

  return postCreation
}

export const useGetRecentPosts = () => {
  const getRecentPosts = usePostsContext()

  const recentPosts = useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: () => getRecentPosts()
  })

  return { recentPosts }
}

export const useGetPostById = (id: string) => {
  const post = useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID],
    queryFn: () => getPostById(id)
  })

  return { post }
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  const { isPending, mutateAsync } = useMutation({
    mutationFn: ({ postId, imageId }: { postId: string; imageId: string }) =>
      deletePost(postId, imageId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
      })
  })

  return { isPending, mutateAsync }
}

export const useSearchPosts = (searchTerm: string) => {
  const result = useInfiniteQuery({
    queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
    initialPageParam: '0',
    queryFn: ({ pageParam }) =>
      searchPosts({ pageParam: pageParam, searchTerm }),
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
