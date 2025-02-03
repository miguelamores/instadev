import { useViewTransitionState } from 'react-router-dom'
import PostCardStats from './PostCardStats'
import { IUser, Post } from '@/types'

type PostCardType = {
  post: Post
  creator: IUser
}

const PostCardProfile = ({ post, creator }: PostCardType) => {
  const isTransitioning = useViewTransitionState(`/post/${post.$id}`)

  return (
    <div className='shadow-sm shadow-black max-w-sm xl:max-w-md bg-[#252728] rounded-lg dark:bg-gray-800 dark:border-gray-700'>
      <img
        style={{
          viewTransitionName: isTransitioning ? 'full-embed' : ''
        }}
        className='rounded-lg object-cover h-36 w-full'
        src={post.imageUrl}
        alt={`post image of ${creator.email}`}
      />
      <div className='p-5 flex justify-between items-center'>
        <p className='text-xl line-clamp-2'>{post.content}</p>
        <PostCardStats post={post} userId={creator.id} hideSaved />
      </div>
    </div>
  )
}

export default PostCardProfile
