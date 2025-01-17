import useAuth from '@/hooks/useAuth'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Header = () => {
  const {
    accountSignOut: { mutate: signOut, isSuccess }
  } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      navigate('/sign-in')
    }
  }, [isSuccess])

  return (
    <header className='header sticky top-0 left-0 right-0 flex items-center'>
      <Button variant={'ghost'} onClick={() => signOut()}>
        <img src='logout.svg' alt='logout' height={25} width={25} />
        <p>Logout</p>
      </Button>
    </header>
  )
}

export default Header
