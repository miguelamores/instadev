import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'

const PostDetailCard = ({ post, isUserOwner = false }) => {
  return (
    <section className='px-10 py-5 flex flex-col items-center shadow-sm shadow-black bg-[#252728] rounded-lg'>
      <img
        className='rounded-lg full-embed w-[600px]'
        src={post.imageUrl}
        alt={`post image of ${post.creator.email}`}
      />
      <h1>{post.content}</h1>
      <img
        className='rounded-full w-12 h-12'
        height={48}
        width={48}
        src={post.creator.imageUrl}
        alt={`avatar of ${post.creator.email}`}
        role='avatar'
      />
      <p className='font-semibold text-xl'>{post.creator.name}</p>
      <h3 className='text-slate-500 text-base'>
        {post.creator.$createdAt} ago
      </h3>
      {isUserOwner && (
        <AlertDialog>
          <AlertDialogTrigger>
            <img
              width={24}
              height={24}
              src='/assets/icons/remove.svg'
              alt='remove icon'
            />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                post.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </section>
  )
}

export default PostDetailCard
