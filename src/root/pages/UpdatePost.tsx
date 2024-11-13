import PostForm from '@/components/shared/PostForm'
import { useGetPostById } from '@/hooks/usePosts'
import { useParams } from 'react-router-dom'

const UpdatePost = () => {
  const { postId } = useParams()

  const { post } = useGetPostById(postId || '')

  if (post.isPending) return <p>Loading....</p>
  if (post.isError) return <p>{post.error.message ?? 'Error loading post'}</p>

  console.log(post.data)

  return (
    <section className='px-10 py-5'>
      <h2>Update Post</h2>
      <PostForm post={post.data} action='update' />
    </section>
  )
}

export default UpdatePost
