import PostForm from '@/components/shared/PostForm'

const CreatePost = () => {
  return (
    <section className='px-10 py-5'>
      <h2>Create Post</h2>
      <PostForm action='create' />
    </section>
  )
}

export default CreatePost
