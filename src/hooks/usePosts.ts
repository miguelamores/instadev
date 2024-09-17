import { createPost } from '@/services/appwrite'
import { INewPost } from '@/types'
import { useMutation } from '@tanstack/react-query'

const usePosts = () => {
  const postCreation = useMutation({
    mutationFn: (post: INewPost) => createPost(post)
  })
  return { postCreation }
}

export default usePosts
