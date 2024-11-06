import { useGetCurrentUser } from '@/hooks/useGetCurrentUser'
import useSavePosts from '@/hooks/useSavePosts'
import { Models } from 'appwrite'

type PostCardStatsType = {
  post: Models.Document
  userId: string
}

const PostCardStats = ({ post, userId }: PostCardStatsType) => {
  const { savePost, deleteSavedPost } = useSavePosts()
  const { data: currentUser } = useGetCurrentUser()
  console.log({ post })
  console.log({ currentUser })

  const savedPost = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  )
  console.log({ savedPost })

  const handleSavePost = e => {
    if (savedPost) {
      deleteSavedPost.mutate(savedPost.$id)
      return
    }
    savePost.mutate({ userId, postId: post.$id })
  }

  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center'>
        <img
          src='/public/assets/icons/like.svg'
          alt='like'
          className='w-6 h-6 stroke-white'
          width={24}
          height={24}
        />
        <p>0</p>
      </div>
      <div className='flex items-center'>
        <img
          src={`${
            savedPost
              ? '/public/assets/icons/saved.svg'
              : '/public/assets/icons/save.svg'
          } `}
          alt='like'
          className='w-6 h-6 stroke-white cursor-pointer'
          width={24}
          height={24}
          onClick={handleSavePost}
        />
      </div>
    </div>
  )
}

export default PostCardStats
