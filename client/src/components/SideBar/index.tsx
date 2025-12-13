import { sidebarItems } from '@/constants/sidebar'
import { useLocation, useNavigate } from 'react-router-dom'
import clsx from 'clsx'

export default function SideBar() {
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location.pathname.split('/')[1])
  return (
    <nav className=' flex flex-col sm:min-w-52 bg-bg-main gap-1.5 px-2 pt-2'>
      {sidebarItems.map((item, key) => (
        <span
          key={key}
          onClick={() => {
            navigate(`/${item.path}`)
          }}
          className={clsx(
            'bg-white px-10 py-3 rounded-xl shadow-sm cursor-pointer select-none font-bold text-textmain',
            'hover:text-white hover:scale-105 active:scale-95 duration-300',
            location.pathname.split('/')[1] === item.path
              ? 'bg-primary text-white'
              : 'bg-primary-hover'
          )}
        >
          {item.title}
        </span>
      ))}
    </nav>
  )
}
