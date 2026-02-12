import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { getSession, logout, isAuthenticated } from '../utils/auth'

export default function Navbar() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkAuth = () => {
      const auth = isAuthenticated()
      setAuthenticated(auth)
      if (auth) {
        setUser(getSession())
      } else {
        setUser(null)
      }
    }
    checkAuth()
    // Check auth on storage changes (for logout from other tabs)
    window.addEventListener('storage', checkAuth)
    return () => window.removeEventListener('storage', checkAuth)
  }, [])

  const handleLogout = () => {
    logout()
    setAuthenticated(false)
    setUser(null)
    setMenuOpen(false)
    navigate('/login', { replace: true })
  }

  const publicLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/signup', label: 'Signup' },
    { to: '/login', label: 'Login' },
  ]

  const authLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/dashboard', label: 'Dashboard' },
  ]

  const navLinks = authenticated ? authLinks : publicLinks

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-army-primary text-army-sand'
        : 'text-gray-300 hover:bg-surface-card hover:text-army-sand'
    }`

  return (
    <header className="sticky top-0 z-50 w-full min-w-[320px] max-w-full overflow-hidden bg-surface-dark border-b border-army-primary/50 shadow-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-3 xs:px-4 sm:px-6 lg:px-8 h-14 sm:h-16">
        <Link
          to="/"
          className="flex items-center gap-1.5 sm:gap-2 text-army-sand font-bold text-base sm:text-lg tracking-tight transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          <span className="text-army-olive">◆</span>
          <span className="hidden xs:inline">Army Nexus</span>
          <span className="xs:hidden">AN</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex md:items-center md:gap-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={linkClass}
            >
              {label}
            </NavLink>
          ))}
          {authenticated && (
            <button
              onClick={handleLogout}
              className="px-3 sm:px-4 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-surface-card hover:text-army-sand transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Logout
            </button>
          )}
        </div>

        {/* Hamburger */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-army-sand hover:bg-surface-card focus:outline-none focus:ring-2 focus:ring-army-olive transition-all duration-200 active:scale-95"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="sr-only">Toggle menu</span>
          {menuOpen ? (
            <svg className="h-6 w-6 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-army-primary/50 bg-surface-dark animate-in slide-in-from-top duration-200">
          <div className="px-3 xs:px-4 py-3 space-y-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={linkClass}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
            {authenticated && (
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 xs:px-4 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-surface-card hover:text-army-sand transition-all duration-200"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
