import { Post } from '@/types'
import PostCardOverview from './PostCardOverview'

export function ExploreList({ posts }: { posts: Post[] }) {
  if (!posts?.length) {
    return <p>No posts found</p>
  }

  return (
    <ul className='grid grid-cols-1 md:grid-cols-auto justify-center gap-4 w-full md:w-2/3 pt-4 pb-4'>
      {posts.map(post => (
        <li key={post.$id} className='mx-auto'>
          <PostCardOverview post={post} />
        </li>
      ))}
    </ul>
  )
}
