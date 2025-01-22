import useAuth from '@/hooks/useAuth'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import useSession from '@/hooks/useSession'

const Header = () => {
  const {
    accountSignOut: { mutate: signOut, isSuccess }
  } = useAuth()
  const { user } = useSession()
  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      navigate('/sign-in')
    }
  }, [isSuccess])

  return (
    <header className='header sticky top-0 left-0 right-0 flex items-center justify-between p-2 md:p-5 shadow-sm shadow-white/5'>
      <Button variant={'link'} onClick={() => signOut()} className='text-white'>
        <img src='logout.svg' alt='logout' height={25} width={25} />
        <p className='text-white'>Logout</p>
      </Button>
      <Link to='profile' className='flex items-center justify-center gap-2'>
        <img
          src={`${user.imageUrl}`}
          alt={`${user.username} avatar`}
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
