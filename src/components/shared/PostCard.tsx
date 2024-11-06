import { formatRelativeTime } from '@/lib/utils'
import { Models } from 'appwrite'
import { Link } from 'react-router-dom'
import PostCardStats from './PostCardStats'
import useSession from '@/hooks/useSession'

type PostCardType = {
  post: Models.Document
}

const PostCard = ({ post }: PostCardType) => {
  const { user } = useSession()

  return (
    <div className='max-w-sm xl:max-w-3xl bg-transparent border border-gray-200/50 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-3'>
      <Link
        to={`/profile/${post.creator.$id}`}
        className='flex items-center gap-2 justify-start w-max'
      >
        <img
          className='rounded-full w-12 h-12'
          height={48}
          width={48}
          src={post.creator.imageUrl}
          alt={`avatar of ${post.creator.email}`}
        />
        <h3 className='font-semibold text-xl'>{post.creator.name}</h3>
        <h3 className='text-slate-500 text-base'>{post.creator.email}</h3> -
        <h3 className='text-slate-500 text-base'>
          {formatRelativeTime(post.creator.$createdAt)}
        </h3>
      </Link>
      <p className='text-xl pt-3'>{post.content}</p>
      <p className='text-slate-500 py-3'>
        {post.tags.map((tag: string) => `#${tag} `)}
      </p>
      <img
        className='rounded-lg'
        src={post.imageUrl}
        alt={`post image of ${post.creator.email}`}
      />
      <div className='p-5'>
        {/* <a href='#'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
            {post.content}
          </h5>
        </a> */}
        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
          {post.content}
        </p>
        <PostCardStats post={post} userId={user.id} />
      </div>
    </div>
  )
}

export default PostCard
