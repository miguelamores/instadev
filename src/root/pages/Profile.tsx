import PostCardProfile from '@/components/shared/PostCardProfile'
import { useGetCurrentUser } from '@/hooks/useGetCurrentUser'
import useSession from '@/hooks/useSession'
import { Post } from '@/types'

const Profile = () => {
  const { user } = useSession()
  const { data: currentUser } = useGetCurrentUser()

  return (
    <div className='overflow-y-auto p-4 h-dvh'>
      <section className='flex flex-col items-center gap-4'>
        <div className='flex gap-5 flex-col md:flex-row items-center'>
          <img
            src={user.imageUrl}
            alt={`profile image of ${user.name}`}
            width={144}
            height={144}
            className='rounded-full w-36 h-36 border-4'
          />
          <div className='flex flex-col justify-center text-3xl items-center md:items-start'>
            <p className='font-bold'>{user.email}</p>
            <p className='font-semibold'>{user.name}</p>
          </div>
        </div>
      </section>
      <section>
        <h2 className='text-2xl font-semibold my-10 text-center'>
          Your posts:
        </h2>
        <ul className='flex flex-col gap-3 items-center'>
          {currentUser?.posts.map((post: Post) => (
            <PostCardProfile key={post.$id} post={post} creator={currentUser} />
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Profile
