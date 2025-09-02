import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { fetchProducts } from '../store/slices/productSlice'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SidebarFilter from '../components/SidebarFilter'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'

const UsedPhones = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { loading } = useSelector((state: RootState) => state.products)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('relevance')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  // Mock data for used phones
  const usedPhones: Array<{
    id: number
    name: string
    price: number
    image: string
    specs: {
      storage?: string
      color: string
      screenSize: string
    }
    label: 'old' | 'new' | 'sale' | 'featured'
    labelText: string
  }> = [
    {
      id: 101,
      name: 'iPhone 14 Pro (Used)',
      price: 699.99,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
      specs: {
        storage: '256GB',
        color: 'Deep Purple',
        screenSize: '6.1" Super Retina XDR'
      },
      label: 'old',
      labelText: 'USED'
    },
    {
      id: 102,
      name: 'Samsung Galaxy S23 (Used)',
      price: 549.99,
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop',
      specs: {
        storage: '128GB',
        color: 'Phantom Black',
        screenSize: '6.1" AMOLED'
      },
      label: 'old',
      labelText: 'USED'
    },
    {
      id: 103,
      name: 'Google Pixel 7 Pro (Used)',
      price: 449.99,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
      specs: {
        storage: '256GB',
        color: 'Obsidian',
        screenSize: '6.7" OLED'
      },
      label: 'old',
      labelText: 'USED'
    },
    {
      id: 104,
      name: 'OnePlus 10 Pro (Used)',
      price: 399.99,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
      specs: {
        storage: '128GB',
        color: 'Volcanic Black',
        screenSize: '6.7" AMOLED'
      },
      label: 'old',
      labelText: 'USED'
    },
    {
      id: 105,
      name: 'iPhone 13 (Used)',
      price: 499.99,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
      specs: {
        storage: '128GB',
        color: 'Blue',
        screenSize: '6.1" Super Retina XDR'
      },
      label: 'old',
      labelText: 'USED'
    },
    {
      id: 106,
      name: 'Samsung Galaxy S22 (Used)',
      price: 399.99,
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop',
      specs: {
        storage: '256GB',
        color: 'Green',
        screenSize: '6.1" AMOLED'
      },
      label: 'old',
      labelText: 'USED'
    },
    {
      id: 107,
      name: 'Xiaomi 12 Pro (Used)',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
      specs: {
        storage: '128GB',
        color: 'Gray',
        screenSize: '6.73" AMOLED'
      },
      label: 'old',
      labelText: 'USED'
    },
    {
      id: 108,
      name: 'Nothing Phone 1 (Used)',
      price: 249.99,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
      specs: {
        storage: '128GB',
        color: 'White',
        screenSize: '6.55" OLED'
      },
      label: 'old',
      labelText: 'USED'
    }
  ]

  // Filter and sort products
  const filteredProducts = usedPhones.filter(() => {
    // Add filtering logic here based on sidebar filters
    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const productsPerPage = 8
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const currentProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage)

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Header activePage="used-phones" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <SidebarFilter 
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Used Phones</h1>
                <p className="text-gray-600">
                  Quality pre-owned smartphones at great prices
                </p>
              </div>
              
              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Filters
              </button>
            </div>

            {/* Sort and View Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading used phones...</p>
              </div>
            ) : (
              <>
                {/* Products Grid */}
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                    : 'grid-cols-1'
                }`}>
                  {currentProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      image={product.image}
                      specs={product.specs}
                      label={product.label}
                      labelText={product.labelText}
                    />
                  ))}
                </div>

                {/* Empty State */}
                {currentProducts.length === 0 && (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No used phones found</h3>
                    <p className="text-gray-600">Try adjusting your filters or search criteria.</p>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                      onLoadMore={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default UsedPhones
