import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/store'
import { logout } from '../store/slices/authSlice'

interface HeaderProps {
  activePage: string
}

const Header = ({ activePage }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  
  const cartDropdownRef = useRef<HTMLDivElement>(null)
  const userDropdownRef = useRef<HTMLDivElement>(null)
  
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const { items } = useSelector((state: RootState) => state.cart)
  const navigate = useNavigate()

  // Calculate total quantity of all items in cart
  const totalQuantity = items && items.length > 0 ? items.reduce((sum, item) => sum + item.quantity, 0) : 0
  
  // Debug: Log cart state
  console.log('Cart items in Header:', items)
  console.log('Total quantity:', totalQuantity)
  console.log('Items length:', items ? items.length : 'undefined')

  const handleLogout = () => {
    dispatch(logout())
    setIsUserDropdownOpen(false)
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target as Node)) {
        setIsCartDropdownOpen(false)
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false)
      }
      // Close search dropdown when clicking outside
      if (!event.target || !(event.target as Element).closest('.search-container')) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const getNavLinkClass = (page: string) => {
    const baseClass = "px-3 py-2 text-sm font-medium transition duration-200"
    return activePage === page 
      ? `${baseClass} text-blue-600 border-b-2 border-blue-600`
      : `${baseClass} text-gray-700 hover:text-blue-600`
  }

  const getMobileNavClass = (page: string) => {
    const baseClass = "block px-3 py-2 text-base font-medium transition duration-200"
    return activePage === page 
      ? `${baseClass} text-blue-600 bg-blue-50` 
      : `${baseClass} text-gray-700 hover:text-blue-600`
  }



  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg transition-all duration-300 ${
      isScrolled ? 'shadow-xl bg-white/98' : 'shadow-lg bg-white/95'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Left Section - Logo and Shop Name */}
          <div className="flex-shrink-0 mr-8">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              MobileMart
            </Link>
          </div>

          {/* Center Section - Navigation */}
          <nav className="hidden md:flex space-x-8 flex-1 justify-center">
            <Link 
              to="/" 
              className={getNavLinkClass('home')}
            >
              Home
            </Link>
            <Link 
              to="/new-phones" 
              className={getNavLinkClass('new-phones')}
            >
              New Phones
            </Link>
            <Link 
              to="/used-phones" 
              className={getNavLinkClass('used-phones')}
            >
              Used Phones
            </Link>
            <Link 
              to="/accessories" 
              className={getNavLinkClass('accessories')}
            >
              Accessories
            </Link>
            <Link 
              to="/about" 
              className={getNavLinkClass('about')}
            >
              About Us
            </Link>
          </nav>

          {/* Right Section - Icons Group */}
          <div className="flex items-center space-x-2 ml-auto">
            {/* Search Icon */}
            <div className="relative search-container">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              {/* Search Dropdown */}
              {isSearchOpen && (
                <div className="absolute right-0 top-full pt-1 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Search</h3>
                  </div>
                  <div className="p-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="Search for phones and accessories..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        autoFocus
                      />
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        Search
                      </button>
                      <button 
                        onClick={() => setIsSearchOpen(false)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Icon with Dropdown */}
            <div className="relative" ref={cartDropdownRef}>
              <div
                className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
                onMouseEnter={() => setIsCartDropdownOpen(true)}
                onMouseLeave={() => setIsCartDropdownOpen(false)}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                    {totalQuantity}
                  </span>
                )}
              </div>

              {/* Cart Dropdown */}
              {isCartDropdownOpen && (
                <div 
                  className="absolute right-0 top-full pt-1 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                  onMouseEnter={() => setIsCartDropdownOpen(true)}
                  onMouseLeave={() => setIsCartDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Shopping Cart</h3>
                  </div>
                  
                  {items.length === 0 ? (
                    <div className="px-4 py-6 text-center text-gray-500">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <p className="mt-2">Your cart is empty</p>
                    </div>
                  ) : (
                    <>
                      <div className="max-h-64 overflow-y-auto">
                        {items.map((item, index) => (
                          <div key={index} className="flex items-center px-4 py-3 hover:bg-gray-50">
                            <div className="flex-shrink-0 w-12 h-12">
                              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                              </div>
                            </div>
                            <div className="ml-3 flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">${item.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="px-4 py-3 border-t border-gray-200">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm font-medium text-gray-900">Total:</span>
                          <span className="text-lg font-bold text-blue-600">
                            ${items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                          </span>
                        </div>
                        <Link
                          to="/cart"
                          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium text-center block"
                          onClick={() => setIsCartDropdownOpen(false)}
                        >
                          View Cart
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* User Icon with Dropdown */}
            <div className="relative" ref={userDropdownRef}>
              <div
                className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
                onMouseEnter={() => setIsUserDropdownOpen(true)}
                onMouseLeave={() => setIsUserDropdownOpen(false)}
                onClick={() => navigate('/my-info')}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>

              {/* User Dropdown */}
              {isUserDropdownOpen && (
                <div 
                  className="absolute right-0 top-full pt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                  onMouseEnter={() => setIsUserDropdownOpen(true)}
                  onMouseLeave={() => setIsUserDropdownOpen(false)}
                >
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">Welcome, {user?.username || 'User'}</p>
                      </div>
                      <Link
                        to="/my-info"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        My Info
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/my-info"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        My Info
                      </Link>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        Login
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              <Link 
                to="/" 
                className={getMobileNavClass('home')}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/new-phones" 
                className={getMobileNavClass('new-phones')}
                onClick={() => setIsMenuOpen(false)}
              >
                New Phones
              </Link>
              <Link 
                to="/used-phones" 
                className={getMobileNavClass('used-phones')}
                onClick={() => setIsMenuOpen(false)}
              >
                Used Phones
              </Link>
              <Link 
                to="/accessories" 
                className={getMobileNavClass('accessories')}
                onClick={() => setIsMenuOpen(false)}
              >
                Accessories
              </Link>
              <Link 
                to="/about" 
                className={getMobileNavClass('about')}
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
            </div>
            
            {/* Mobile Search */}
            <div className="px-4 py-3 border-t border-gray-200">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search for phones and accessories"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
