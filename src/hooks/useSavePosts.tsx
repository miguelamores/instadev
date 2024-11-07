import { QUERY_KEYS } from '@/consts'
import { deleteSavedPost, savePost } from '@/services/appwrite'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Models } from 'appwrite'
import { toast } from '@/hooks/use-toast'

const useSavePosts = () => {
  const queryClient = useQueryClient()

  const savePostMutation = useMutation({
    mutationFn: ({ userId, postId }: { userId: string; postId: string }) =>
      savePost(userId, postId),
    onMutate: async ({
      userId,
      postId
    }: {
      userId: string
      postId: string
    }) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER]
      })

      const previousUser = queryClient.getQueryData([
        QUERY_KEYS.GET_CURRENT_USER
      ])

      queryClient.setQueryData(
        [QUERY_KEYS.GET_CURRENT_USER],
        (oldUser: Models.Document) => {
          if (oldUser) {
            return {
              ...oldUser,
              save: [...oldUser.save, { post: { $id: postId } }]
            }
          }
        }
      )

      return { previousUser }
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        [QUERY_KEYS.GET_CURRENT_USER],
        context?.previousUser
      )
      toast({ title: 'Error saving post, please try again' })
    },
    onSettled: () => {
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
    onMutate: async (documentId: string) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER]
      })

      const previousUser = queryClient.getQueryData([
        QUERY_KEYS.GET_CURRENT_USER
      ])

      queryClient.setQueryData(
        [QUERY_KEYS.GET_CURRENT_USER],
        (oldUser: Models.Document) => {
          if (oldUser) {
            return {
              ...oldUser,
              save: oldUser.save.filter(
                (document: Models.Document) => document.$id !== documentId
              )
            }
          }
        }
      )

      return { previousUser }
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        [QUERY_KEYS.GET_CURRENT_USER],
        context?.previousUser
      )
      toast({ title: 'Error removing save, please try again' })
    },
    onSettled: () => {
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
