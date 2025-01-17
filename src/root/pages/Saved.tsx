import PostCardOverview from '@/components/shared/PostCardOverview'
import { useGetSavedPosts } from '@/hooks/useGetSavedPosts'

const Saved = () => {
  const { data } = useGetSavedPosts()

  return (
    <section className='w-full flex flex-col items-center gap-4 py-6'>
      <h1>Saved posts</h1>
      <ul className='flex flex-col gap-3'>
        {data?.documents.map(({ post }) => (
          <PostCardOverview key={post.$id} post={post} />
        ))}
      </ul>
    </section>
  )
}

export default Saved
