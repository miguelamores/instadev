import { Outlet } from 'react-router-dom'
import './root-layout.css'

const RootLayout = () => {
  return (
    <div className='root-layout relative overflow-hidden'>
      <header className='header sticky top-0 left-0 right-0'>header</header>
      <aside className='sidebar'>aside</aside>
      <main className='main overflow-y-scroll'>
        <Outlet />
      </main>
      <footer className='footer sticky bottom-0'>footer</footer>
    </div>
  )
}

export default RootLayout
