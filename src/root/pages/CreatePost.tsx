import PostForm from '@/components/shared/PostForm'

const CreatePost = () => {
  return (
    <section className='w-full flex flex-col items-center gap-4 py-6 p-4'>
      <h2>Create Post</h2>
      <PostForm action='create' />
    </section>
  )
}

export default CreatePost
