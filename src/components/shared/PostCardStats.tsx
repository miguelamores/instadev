import { useGetCurrentUser } from '@/hooks/useGetCurrentUser'
import useLikePosts from '@/hooks/useLikePosts'
import useSavePosts from '@/hooks/useSavePosts'
import { Post } from '@/types'
import { Models } from 'appwrite'

type PostCardStatsType = {
  post: Post
  userId: string
  hideSaved?: boolean
}

const PostCardStats = ({ post, userId, hideSaved }: PostCardStatsType) => {
  const { savePost, deleteSavedPost } = useSavePosts()
  const { likePost, deleteLikedPost } = useLikePosts()
  const { data: currentUser } = useGetCurrentUser()

  const savedPost = currentUser?.saves.find(
    (record: Models.Document) => record.post.$id === post.$id
  )
  const likedPost = currentUser?.likes.find(
    (record: Models.Document) => record.post.$id === post.$id
  )

  const handleSavePost = () => {
    if (savedPost) {
      deleteSavedPost.mutate(savedPost.$id)
      return
    }
    savePost.mutate({ userId, postId: post.$id })
  }

  const handleLikePost = () => {
    if (likedPost) {
      deleteLikedPost.mutate(likedPost.$id)
      return
    }
    likePost.mutate({ userId, postId: post.$id })
  }

  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-2'>
        <img
          src={`${
            likedPost ? '/assets/icons/liked.svg' : '/assets/icons/like.svg'
          }`}
          alt='like'
          className='w-6 h-6 stroke-white cursor-pointer'
          width={24}
          height={24}
          onClick={handleLikePost}
        />
        <p>{post.likedBy.length}</p>
      </div>
      {!hideSaved && (
        <div className='flex items-center'>
          <img
            src={`${
              savedPost ? '/assets/icons/saved.svg' : '/assets/icons/save.svg'
            } `}
            alt='like'
            className='w-6 h-6 stroke-white cursor-pointer'
            width={24}
            height={24}
            onClick={handleSavePost}
          />
        </div>
      )}
    </div>
  )
}

export default PostCardStats
