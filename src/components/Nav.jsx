import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'

export default function Nav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const title = useMemo(() => {
    if (pathname.startsWith('/create')) return 'Create Ticket'
    if (pathname.startsWith('/ticket')) return 'Ticket Detail'
    return 'Dashboard'
  }, [pathname])

  const activeClass = 'bg-white text-blue-600 shadow-sm'
  const baseClass = 'px-4 py-2 rounded-lg font-medium transition bg-blue-700 hover:bg-blue-600 text-white'

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="bg-white text-blue-600 rounded-lg p-2"
              aria-label="Home"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Support Desk</h1>
              <p className="text-white/80 text-xs sm:text-sm">{title}</p>
            </div>
          </div>
          <nav className="flex gap-2 sm:gap-3">
            <NavLink to="/" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ''}`}>
              Dashboard
            </NavLink>
            <NavLink to="/create" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ''}`}>
              Create Ticket
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  )
}
