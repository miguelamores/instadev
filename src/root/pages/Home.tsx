import PostCard from '@/components/shared/PostCard'
import usePosts from '@/hooks/usePosts'

const Home = () => {
  const {
    recentPosts: { data: posts, isPending }
  } = usePosts()
  // console.log(recentPosts.data)
  return (
    <div className='overflow-y-auto'>
      <p>home</p>
      <section className='flex flex-col items-center gap-4'>
        {posts?.documents?.map(doc => (
          // <h2 key={doc.$id}>{doc.content}</h2>
          <PostCard key={doc.$id} post={doc} />
        ))}
      </section>
    </div>
  )
}

export default Home
