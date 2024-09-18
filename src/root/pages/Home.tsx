import usePosts from '@/hooks/usePosts'

const Home = () => {
  const { recentPosts } = usePosts()
  console.log(recentPosts.data)
  return (
    <div className='overflow-y-auto'>
      <p>home</p>
    </div>
  )
}

export default Home
