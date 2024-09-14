import { Routes, Route } from 'react-router-dom'
import SignIn from '@/auth/SignIn'
import SignUp from '@/auth/SignUp'
import AuthLayout from '@/auth/AuthLayout'
import useSession from '@/hooks/useSession'
import Home from '@/root/pages/Home'
import RootLayout from '@/root/RootLayout'

function App() {
  useSession()

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
      </Route>
      <Route element={<RootLayout />}>
        <Route path='/' element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
