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
              className={`flex items-center justify-start gap-2 px-5 py-2 ${
                isActive ? 'bg-slate-600 rounded-lg' : ''
              }`}
            >
              <img
                src={link.imgURL}
                alt={link.label}
                className='text-white'
                width={26}
                height={26}
              />
              <Link to={link.route}>{link.label}</Link>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

export default Sidebar
