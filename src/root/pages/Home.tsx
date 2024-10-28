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
      <ul>
        {posts?.documents?.map(doc => (
          // <h2 key={doc.$id}>{doc.content}</h2>
          <PostCard key={doc.$id} post={doc} />
        ))}
      </ul>
    </div>
  )
}

export default Home
