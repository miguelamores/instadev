import { bottombarLinks } from '@/consts'

import { NavLink, useLocation } from 'react-router-dom'

const BottomNavigator = () => {
  const { pathname } = useLocation()
  return (
    <section className='h-full flex items-center justify-between px-4'>
      {bottombarLinks.map(link => {
        const isActive = pathname === link.route
        return (
          <NavLink
            key={`bottom-${link.route}`}
            to={link.route}
            className={`flex flex-col ${
              isActive ? 'rounded-sm bg-slate-700' : ''
            }`}
          >
            {link.label}
          </NavLink>
        )
      })}
    </section>
  )
}

export default BottomNavigator
