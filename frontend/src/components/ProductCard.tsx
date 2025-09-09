import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/slices/cartSlice'
import { Label } from './ui/label'

interface ProductCardProps {
  id: number
  name: string
  price: number
  image?: string
  specs?: string // Keep for backward compatibility
  specifications?: Record<string, string> // New specifications field
  label?: 'new' | 'used' | 'sale' | 'featured'
  labelText?: string
}

const ProductCard = ({ id, name, price, image, specs, specifications, label = 'new', labelText }: ProductCardProps) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Debug props
  console.log('🖼️ [ProductCard] Props:', { id, name, image, specs, specifications })

  // Parse specs JSON string (for backward compatibility)
  const parsedSpecs = specs ? (() => {
    try {
      return JSON.parse(specs)
    } catch (error) {
      console.warn('Failed to parse specs JSON:', error)
      return null
    }
  })() : null

  // Use new specifications field if available, otherwise fall back to parsed specs
  const displaySpecs = specifications || parsedSpecs
  
  // Debug displaySpecs
  console.log('📋 [ProductCard] DisplaySpecs:', { id, name, displaySpecs })

  const handleCardClick = () => {
    console.log('🖱️ [ProductCard] Card clicked, navigating to product:', id)
    navigate(`/products/${id}`)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    
    console.log('🛒 [ProductCard] Adding product to cart:', {
      id,
      name,
      price,
      image
    })
    
    // Add item to cart using Redux
    dispatch(addToCart({
      id: id,
      name: name,
      price: price,
      quantity: 1,
      image: image || ''
    }))
    
    // Redirect to cart page
    navigate('/cart')
  }

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col h-full"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img
          src={image || '/placeholder-image.jpg'}
          alt={name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            console.warn('🖼️ [ProductCard] Image failed to load:', image, 'for product:', name)
            e.currentTarget.src = '/placeholder-image.jpg'
          }}
          onLoad={() => {
            console.log('🖼️ [ProductCard] Image loaded successfully:', image, 'for product:', name)
          }}
        />
        <Label 
          variant={label} 
          className="absolute top-3 right-3"
        >
          {labelText || (label === 'new' ? 'NEW' : label === 'used' ? 'USED' : label?.toUpperCase() || 'NEW')}
        </Label>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {name}
        </h3>
        
        <div className="flex-grow"></div>
        
        <div className="text-sm text-gray-600 space-y-1 mb-4">
          {displaySpecs ? (
            <>
              {displaySpecs.Storage && (
                <div className="flex justify-between truncate">
                  <span className="text-gray-500">Storage:</span>
                  <span className="font-medium truncate ml-2">{displaySpecs.Storage}</span>
                </div>
              )}
              {displaySpecs.Color && (
                <div className="flex justify-between truncate">
                  <span className="text-gray-500">Color:</span>
                  <span className="font-medium truncate ml-2">{displaySpecs.Color}</span>
                </div>
              )}
              {displaySpecs['Screen Size'] && (
                <div className="flex justify-between truncate">
                  <span className="text-gray-500">Screen:</span>
                  <span className="font-medium truncate ml-2">{displaySpecs['Screen Size']}</span>
                </div>
              )}
              {displaySpecs.Processor && (
                <div className="flex justify-between truncate">
                  <span className="text-gray-500">Processor:</span>
                  <span className="font-medium truncate ml-2">{displaySpecs.Processor}</span>
                </div>
              )}
              {displaySpecs.RAM && (
                <div className="flex justify-between truncate">
                  <span className="text-gray-500">RAM:</span>
                  <span className="font-medium truncate ml-2">{displaySpecs.RAM}</span>
                </div>
              )}
              {displaySpecs.Camera && (
                <div className="flex justify-between truncate">
                  <span className="text-gray-500">Camera:</span>
                  <span className="font-medium truncate ml-2">{displaySpecs.Camera}</span>
                </div>
              )}
              {displaySpecs.Battery && (
                <div className="flex justify-between truncate">
                  <span className="text-gray-500">Battery:</span>
                  <span className="font-medium truncate ml-2">{displaySpecs.Battery}</span>
                </div>
              )}
              {displaySpecs.OS && (
                <div className="flex justify-between truncate">
                  <span className="text-gray-500">OS:</span>
                  <span className="font-medium truncate ml-2">{displaySpecs.OS}</span>
                </div>
              )}
            </>
          ) : (
            <div className="text-gray-400">No specifications available</div>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-blue-600">
            ${typeof price === 'number' ? price.toFixed(2) : '0.00'}
          </span>
          <button 
            className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
