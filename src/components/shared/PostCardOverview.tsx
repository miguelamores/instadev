import { formatRelativeTime } from '@/lib/utils'
import { Models } from 'appwrite'
import { Link, useViewTransitionState } from 'react-router-dom'
import PostCardStats from './PostCardStats'
import useSession from '@/hooks/useSession'

type PostCardType = {
  post: Models.Document
}

const PostCardOverview = ({ post }: PostCardType) => {
  const { user } = useSession()

  const isUserOwner = post?.creator.email === user.email

  const isTransitioning = useViewTransitionState(`/post/${post.$id}`)

  return (
    <div className='shadow-sm shadow-black max-w-sm xl:max-w-md bg-[#252728] rounded-lg dark:bg-gray-800 dark:border-gray-700 p-3'>
      <Link
        to={`/profile/${post.creator.$id}`}
        className='flex items-center gap-2 justify-start w-max mb-5'
      >
        <img
          className='rounded-full w-8 h-8'
          height={48}
          width={48}
          src={post.creator.imageUrl}
          alt={`avatar of ${post.creator.email}`}
        />
        <div className=''>
          <h3 className='font-semibold text-sm'>{post.creator.name}</h3>
          {/* <h3 className='text-slate-500 text-base'>{post.creator.email} - </h3> */}
          <h3 className='text-slate-500 text-sm'>
            {formatRelativeTime(post.creator.$updatedAt)}
          </h3>
        </div>
      </Link>
      <img
        style={{
          viewTransitionName: isTransitioning ? 'full-embed' : ''
        }}
        className='rounded-lg object-cover h-36 w-full'
        src={post.imageUrl}
        alt={`post image of ${post.creator.email}`}
      />
      {/* {isUserOwner && <Link to={`/post/${post.$id}/update`}>edit</Link>} */}
      <Link to={`/post/${post.$id}`} viewTransition>
        <p className='text-xl pt-3 h-24 line-clamp-3'>{post.content}</p>
      </Link>
      <p className='text-slate-500 py-3 h-20 text-balance flex items-center'>
        {post.tags.map((tag: string) => `#${tag} `)}
      </p>
      <div className='p-5 border-t-2'>
        {/* <a href='#'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
            {post.content}
          </h5>
        </a> */}
        <PostCardStats post={post} userId={user.id} />
      </div>
    </div>
  )
}

export default PostCardOverview
