import PostCardOverview from '@/components/shared/PostCardOverview'
import { useGetSavedPosts } from '@/hooks/useGetSavedPosts'

const Saved = () => {
  const { data } = useGetSavedPosts()

  return (
    <div>
      <h1>Saved posts</h1>
      <ul>
        {data?.documents.map(({ post }) => (
          <PostCardOverview key={post.$id} post={post} />
        ))}
      </ul>
    </div>
  )
}

export default Saved
