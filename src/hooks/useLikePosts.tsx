import { QUERY_KEYS } from '@/consts'
import { deleteLikedPost, likePost } from '@/services/appwrite'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Models } from 'appwrite'
import { toast } from '@/hooks/use-toast'

const useLikePosts = () => {
  const queryClient = useQueryClient()

  const likePostMutation = useMutation({
    mutationFn: ({ userId, postId }: { userId: string; postId: string }) =>
      likePost(userId, postId),
    onMutate: async ({ postId }: { userId: string; postId: string }) => {
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
              like: [...oldUser.like, { post: { $id: postId } }]
            }
          }
        }
      )

      return { previousUser }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        [QUERY_KEYS.GET_CURRENT_USER],
        context?.previousUser
      )
      toast({ title: 'Error trying to like post, please try again' })
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER]
      })
    }
  })

  const dislikePostMutation = useMutation({
    mutationFn: (documentId: string) => deleteLikedPost(documentId),
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
              like: oldUser.like.filter(
                (document: Models.Document) => document.$id !== documentId
              )
            }
          }
        }
      )

      return { previousUser }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        [QUERY_KEYS.GET_CURRENT_USER],
        context?.previousUser
      )
      toast({ title: 'Error removing like, please try again' })
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER]
      })
    }
  })

  return { likePost: likePostMutation, deleteLikedPost: dislikePostMutation }
}

export default useLikePosts
