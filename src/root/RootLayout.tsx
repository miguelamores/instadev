import { Outlet } from 'react-router-dom'
import './root-layout.css'
import Header from '@/components/shared/Header'
import Sidebar from '@/components/shared/Sidebar'

const RootLayout = () => {
  return (
    <div className='root-layout relative overflow-hidden'>
      <Header />
      <Sidebar />
      <main className='main overflow-y-scroll'>
        <Outlet />
      </main>
      <footer className='footer sticky bottom-0'>footer</footer>
    </div>
  )
}

export default RootLayout
