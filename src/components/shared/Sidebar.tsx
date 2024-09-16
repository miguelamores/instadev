import { sidebarLinks } from '@/consts'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <aside className='sidebar px-5 py-2'>
      <ul className='flex flex-col gap-10'>
        {sidebarLinks.map(link => {
          return (
            <li key={link.route}>
              <Link to={link.route}>{link.label}</Link>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

export default Sidebar
