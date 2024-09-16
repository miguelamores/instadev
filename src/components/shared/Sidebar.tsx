import { sidebarLinks } from '@/consts'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const { pathname } = useLocation()
  return (
    <aside className='sidebar px-5 py-2'>
      <ul className='flex flex-col gap-10'>
        {sidebarLinks.map(link => {
          const isActive = pathname === link.route
          return (
            <li
              key={link.route}
              className={`flex items-center justify-between ${
                isActive ? 'bg-slate-600 rounded-sm' : ''
              }`}
            >
              <Link to={link.route}>{link.label}</Link>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

export default Sidebar
