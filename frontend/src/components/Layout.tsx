import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/store'
import { logout } from '../store/slices/authSlice'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const { items } = useSelector((state: RootState) => state.cart)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-gray-800">
                Shop Management
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/products" className="text-gray-600 hover:text-gray-900">
                Products
              </Link>
              
              <Link to="/cart" className="text-gray-600 hover:text-gray-900 relative">
                Cart
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {items.length}
                  </span>
                )}
              </Link>
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  {user?.role === 'ADMIN' && (
                    <Link to="/admin" className="text-gray-600 hover:text-gray-900">
                      Admin
                    </Link>
                  )}
                  <Link to="/profile" className="text-gray-600 hover:text-gray-900">
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login" className="text-gray-600 hover:text-gray-900">
                    Login
                  </Link>
                  <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto py-6 px-4">
        {children}
      </main>
    </div>
  )
}

export default Layout
