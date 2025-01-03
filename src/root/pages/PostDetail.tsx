import PostCard from '@/components/shared/PostCard'
import PostDetailCard from '@/components/shared/PostDetailCard'
import { useGetPostById } from '@/hooks/usePosts'
import { useParams } from 'react-router-dom'

const PostDetail = () => {
  const { postId } = useParams()

  const { post } = useGetPostById(postId || '')

  if (post.isPending) return <p>Loading....</p>
  // if (post.isError) return <p>{post.error.message ?? 'Error loading post'}</p>

  // console.log(post.data)

  return (
    <section className='px-10 py-5 flex flex-col items-center'>
      <PostDetailCard post={post.data} />
      {/* <PostCard post={post.data} /> */}
    </section>
  )
}

export default PostDetail