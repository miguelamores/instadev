import { QUERY_KEYS } from '@/consts'
import { deleteSavedPost, savePost } from '@/services/appwrite'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useSavePosts = () => {
  const queryClient = useQueryClient()

  const savePostMutation = useMutation({
    mutationFn: ({ userId, postId }: { userId: string; postId: string }) =>
      savePost(userId, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
      })

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER]
      })
    }
  })

  const unSavePostMutation = useMutation({
    mutationFn: (documentId: string) => deleteSavedPost(documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
      })

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER]
      })
    }
  })

  return { savePost: savePostMutation, deleteSavedPost: unSavePostMutation }
}

export default useSavePosts
