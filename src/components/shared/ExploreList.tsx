import PostCardOverview from './PostCardOverview'

export function ExploreList({ posts }) {
  if (!posts?.length) {
    return <p>No posts found</p>
  }

  return (
    <ul className='grid grid-cols-auto justify-center gap-4 w-2/3 pt-4 pb-4'>
      {posts.map(post => (
        <li key={post.id}>
          <PostCardOverview post={post} />
        </li>
      ))}
    </ul>
  )
}
