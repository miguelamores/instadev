import useAuth from '@/hooks/useAuth'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import useSession from '@/hooks/useSession'

const Header = () => {
  const {
    accountSignOut: { mutateAsync: signOut }
  } = useAuth()
  const { user } = useSession()
  const navigate = useNavigate()

  const handleSignout = async () => {
    await signOut()
    navigate('/sign-in')
  }

  return (
    <header className='header sticky top-0 left-0 right-0 flex items-center justify-between p-2 md:p-5 shadow-sm shadow-white/5'>
      <Button variant={'link'} onClick={handleSignout} className='text-white'>
        <img src='logout.svg' alt='logout' height={25} width={25} />
        <p className='text-white'>Logout</p>
      </Button>
      <Link to='profile' className='flex items-center justify-center gap-2'>
        <img
          src={`${user?.imageUrl}`}
          alt={`${user?.username} avatar`}
          className='rounded-full w-10 h-10'
          height={40}
          width={40}
        />
        <p>Welcome, {user.username}</p>
      </Link>
    </header>
  )
}

export default Header
