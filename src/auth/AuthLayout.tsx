import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1>AuthLayout</h1>
      <Outlet />
    </div>
  )
}

export default AuthLayout
