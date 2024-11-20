import PostCard from '@/components/shared/PostCard'
import { useGetPostById } from '@/hooks/usePosts'
import { useParams } from 'react-router-dom'

const PostDetail = () => {
  const { postId } = useParams()

  const { post } = useGetPostById(postId || '')

  if (post.isPending) return <p>Loading....</p>
  if (post.isError) return <p>{post.error.message ?? 'Error loading post'}</p>

  console.log(post.data)

  return (
    <section className='px-10 py-5 flex flex-col items-center'>
      <img
        className='rounded-lg full-embed w-[600px]'
        src={post.data.imageUrl}
        alt={`post image of ${post.data.creator.email}`}
      />
      {/* <PostCard post={post.data} /> */}
    </section>
  )
}

export default PostDetail
