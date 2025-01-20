import PostCard from '@/components/shared/PostCard'
import { ShinyButton } from '@/components/shared/ShinyButton'
import { useGetRecentPosts } from '@/hooks/usePosts'

const Home = () => {
  const {
    recentPosts: { data, isPending, fetchNextPage, hasNextPage }
  } = useGetRecentPosts()

  const posts = data?.pages?.flatMap(page => page.documents)
  return (
    <div className='overflow-y-auto p-4'>
      <section className='flex flex-col items-center gap-4'>
        <h1 className='text-4xl font-semibold flex sm:justify-start flex-1 w-full mb-4 justify-center'>
          Popular today
        </h1>
        {posts?.map(doc => (
          <PostCard key={doc.$id} post={doc} />
        ))}
        {hasNextPage && (
          <ShinyButton text='Load more' onClick={fetchNextPage} />
        )}
      </section>
    </div>
  )
}

export default Home
