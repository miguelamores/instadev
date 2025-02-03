import { formatRelativeTime } from '@/lib/utils'
import { Link, useViewTransitionState } from 'react-router-dom'
import PostCardStats from './PostCardStats'
import useSession from '@/hooks/useSession'
import { Post } from '@/types'

type PostCardType = {
  post: Post
}

const PostCard = ({ post }: PostCardType) => {
  const { user } = useSession()

  const isTransitioning = useViewTransitionState(`/post/${post.$id}`)

  return (
    <div className='shadow-sm shadow-black max-w-sm md:max-w-3xl bg-[#252728] rounded-lg dark:bg-gray-800 dark:border-gray-700 p-3'>
      <Link
        to={`/profile/${post.creator.$id}`}
        className='flex items-center gap-2 justify-start w-max'
      >
        <img
          className='rounded-full w-16 h-16'
          height={48}
          width={48}
          src={post.creator.imageUrl}
          alt={`avatar of ${post.creator.email}`}
        />
        <div className='flex flex-col items-start justify-between'>
          <h3 className='font-semibold text-lg'>{post.creator.name}</h3>
          <p className='text-slate-500 text-sm'>{post.creator.email}</p>
          <p className='text-slate-500 text-sm'>
            {formatRelativeTime(post.creator.$createdAt)}
          </p>
        </div>
      </Link>
      <Link to={`/post/${post.$id}`} viewTransition>
        <p className='text-xl pt-3'>{post.content}</p>
      </Link>
      <p className='text-slate-500 py-3'>
        {post.tags.map((tag: string) => `#${tag} `)}
      </p>
      <img
        style={{
          viewTransitionName: isTransitioning ? 'full-embed' : ''
        }}
        className='rounded-lg'
        src={post.imageUrl}
        alt={`post image of ${post.creator.email}`}
      />
      {user.id && (
        <div className='p-5'>
          <PostCardStats post={post} userId={user.id} />
        </div>
      )}
    </div>
  )
}

export default PostCard
