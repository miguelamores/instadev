import { bottombarLinks } from '@/consts'

import { NavLink, useLocation } from 'react-router-dom'

const BottomNavigator = () => {
  const { pathname } = useLocation()
  return (
    <section className='h-full flex items-center justify-between px-4 py-1'>
      {bottombarLinks.map(link => {
        const isActive = pathname === link.route
        return (
          <NavLink
            key={`bottom-${link.route}`}
            to={link.route}
            className={`flex flex-col items-center justify-between px-2 py-1 text-white gap-1 ${
              isActive ? 'rounded-lg bg-slate-700' : ''
            }`}
          >
            <p>{link.label}</p>
            <img
              src={link.imgURL}
              alt={link.label}
              height={26}
              width={26}
              className='text-white fill-white'
            />
          </NavLink>
        )
      })}
    </section>
  )
}

export default BottomNavigator
