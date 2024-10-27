import usePosts from '@/hooks/usePosts'

const Home = () => {
  const { recentPosts } = usePosts()
  console.log(recentPosts.data)
  return (
    <div className='overflow-y-auto'>
      <p>home</p>
      <ul>
        {recentPosts?.data?.documents?.map(doc => (
          <h2 key={doc.$id}>{doc.content}</h2>
        ))}
      </ul>
    </div>
  )
}

export default Home
