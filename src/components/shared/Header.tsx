import useAuth from '@/hooks/useAuth'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
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
    <header className='header sticky top-0 left-0 right-0 flex items-center justify-between p-5'>
      <Button variant={'ghost'} onClick={() => signOut()}>
        <img src='logout.svg' alt='logout' height={25} width={25} />
        <p>Logout</p>
      </Button>
      <div className='flex items-center justify-center gap-2'>
        <img
          src={`${user.imageUrl}`}
          alt={`${user.username} avatar`}
          className='rounded-full w-10 h-10'
          height={40}
          width={40}
        />
        <p>Welcome, {user.username}</p>
      </div>
    </header>
  )
}

export default Header
