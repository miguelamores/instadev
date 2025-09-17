import ErrorBoundary from '@/components/shared/ErrorBoundary'
import PostForm from '@/components/shared/PostForm'

const CreatePost = () => {
  return (
    <section className='w-full flex flex-col items-center gap-4 py-6 p-4'>
      <h2>Create Post</h2>
      <ErrorBoundary
        fallback={<p>Failed to load the form. Please try again later.</p>}
      >
        <PostForm action='create' />
      </ErrorBoundary>
    </section>
  )
}

export default CreatePost
