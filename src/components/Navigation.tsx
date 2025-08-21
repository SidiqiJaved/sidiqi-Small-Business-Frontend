import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, User, LogOut } from 'lucide-react'
import { Button } from './ui/button'
import { useAuth } from '../contexts/AuthContext'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isLoggedIn, userRole, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsMenuOpen(false)
  }

  const isActiveRoute = (path: string) => {
    return location.pathname === path
  }

  // Navigation items based on authentication state
  const customerNavItems = [
    { label: 'Home', path: '/' },
    { label: 'Online Ordering', path: '/online-ordering' },
    { label: 'Locations', path: '/locations' },
    { label: 'Contact', path: '/contact' }
  ]

  const franchiseNavItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Inspections', path: '/inspections' },
    { label: 'Training', path: '/training' },
    { label: 'Inventory', path: '/inventory' },
    { label: 'Reports', path: '/reports' }
  ]

  const navItems = isLoggedIn && ['admin', 'franchisee', 'manager'].includes(userRole) 
    ? franchiseNavItems 
    : customerNavItems

  return (
    <nav className="bg-halal-white shadow-lg sticky top-0 z-50" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            aria-label="Halal Munchies Home"
          >
            <div className="w-10 h-10 bg-halal-green rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-halal-green">Halal Munchies</h1>
              <p className="text-xs text-halal-gold">Powered by Sidiqi AI</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:text-halal-gold focus:outline-none focus:ring-2 focus:ring-halal-gold focus:ring-offset-2 ${
                  isActiveRoute(item.path)
                    ? 'text-halal-gold border-b-2 border-halal-gold'
                    : 'text-gray-700 hover:text-halal-gold'
                }`}
                aria-current={isActiveRoute(item.path) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  <span className="capitalize">{userRole}</span>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="border-halal-green text-halal-green hover:bg-halal-green hover:text-white"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button className="bg-halal-green hover:bg-halal-green-dark text-white">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200" id="mobile-menu">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActiveRoute(item.path)
                      ? 'text-halal-gold bg-halal-gold bg-opacity-10'
                      : 'text-gray-700 hover:text-halal-gold hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={isActiveRoute(item.path) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Auth */}
              <div className="pt-4 border-t border-gray-200">
                {isLoggedIn ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-sm text-gray-600 flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span className="capitalize">Logged in as {userRole}</span>
                    </div>
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      size="sm"
                      className="mx-3 border-halal-green text-halal-green hover:bg-halal-green hover:text-white"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-base font-medium text-halal-green hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2 inline" />
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}