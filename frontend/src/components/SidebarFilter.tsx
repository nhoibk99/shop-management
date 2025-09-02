import { useState } from 'react'

interface SidebarFilterProps {
  isOpen: boolean
  onClose: () => void
}

const SidebarFilter = ({ isOpen, onClose }: SidebarFilterProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [isBrandExpanded, setIsBrandExpanded] = useState(false)

  const categories = [
    'Smartphones', 'Tablets', 'Chargers', 'Headphones', 
    'Cases', 'Screen Protectors', 'Power Banks', 'Smartwatches'
  ]

  const brands = ['Apple', 'Samsung', 'Google', 'Xiaomi', 'OnePlus', 'Huawei']

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    )
  }

  const clearAll = () => {
    setSelectedCategories([])
    setSelectedBrands([])
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed top-16 inset-x-0 bottom-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static top-16 lg:top-0 inset-x-0 lg:inset-x-auto left-0 z-40 w-64 bg-white shadow-lg lg:shadow-none
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full overflow-y-auto p-6">
          {/* Mobile close button */}
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Desktop title */}
          <div className="hidden lg:block mb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <button
                onClick={clearAll}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h3 className="text-md font-medium text-gray-900 mb-4">Categories</h3>
            <div className="space-y-3">
              {categories.map((category) => (
                <label key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-3 text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="mb-8">
            <button
              onClick={() => setIsBrandExpanded(!isBrandExpanded)}
              className="flex justify-between items-center w-full text-md font-medium text-gray-900 mb-4"
            >
              <span>Brands</span>
              <svg 
                className={`h-5 w-5 transform transition-transform ${isBrandExpanded ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isBrandExpanded && (
              <div className="space-y-3">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-3 text-sm text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <h3 className="text-md font-medium text-gray-900 mb-4">Price Range</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <span className="ml-3 text-sm text-gray-700">Under $500</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <span className="ml-3 text-sm text-gray-700">$500 - $1000</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <span className="ml-3 text-sm text-gray-700">Over $1000</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SidebarFilter
