import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/slices/cartSlice'
import { Label } from './ui/label'

interface ProductCardProps {
  id: number
  name: string
  price: number
  image?: string
  specs?: string
  label?: 'new' | 'old' | 'sale' | 'featured'
  labelText?: string
}

const ProductCard = ({ id, name, price, image, specs, label = 'new', labelText }: ProductCardProps) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Debug image prop
  console.log('🖼️ [ProductCard] Image prop:', { id, name, image })

  // Parse specs JSON string
  const parsedSpecs = specs ? (() => {
    try {
      return JSON.parse(specs)
    } catch (error) {
      console.warn('Failed to parse specs JSON:', error)
      return null
    }
  })() : null

  const handleCardClick = () => {
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
          {labelText || (label === 'new' ? 'NEW' : label === 'old' ? 'OLD' : label?.toUpperCase() || 'NEW')}
        </Label>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {name}
        </h3>
        
        <div className="text-sm text-gray-600 space-y-1 mb-4 flex-grow">
          {parsedSpecs ? (
            <>
              {parsedSpecs.storage && (
                <p className="flex justify-between">
                  <span className="text-gray-500">Storage:</span>
                  <span className="font-medium">{parsedSpecs.storage}</span>
                </p>
              )}
              {parsedSpecs.color && (
                <p className="flex justify-between">
                  <span className="text-gray-500">Color:</span>
                  <span className="font-medium">{parsedSpecs.color}</span>
                </p>
              )}
              {parsedSpecs.screenSize && (
                <p className="flex justify-between">
                  <span className="text-gray-500">Screen:</span>
                  <span className="font-medium">{parsedSpecs.screenSize}</span>
                </p>
              )}
              {parsedSpecs.processor && (
                <p className="flex justify-between">
                  <span className="text-gray-500">Processor:</span>
                  <span className="font-medium">{parsedSpecs.processor}</span>
                </p>
              )}
              {parsedSpecs.ram && (
                <p className="flex justify-between">
                  <span className="text-gray-500">RAM:</span>
                  <span className="font-medium">{parsedSpecs.ram}</span>
                </p>
              )}
              {parsedSpecs.camera && (
                <p className="flex justify-between">
                  <span className="text-gray-500">Camera:</span>
                  <span className="font-medium">{parsedSpecs.camera}</span>
                </p>
              )}
              {parsedSpecs.battery && (
                <p className="flex justify-between">
                  <span className="text-gray-500">Battery:</span>
                  <span className="font-medium">{parsedSpecs.battery}</span>
                </p>
              )}
              {parsedSpecs.os && (
                <p className="flex justify-between">
                  <span className="text-gray-500">OS:</span>
                  <span className="font-medium">{parsedSpecs.os}</span>
                </p>
              )}
            </>
          ) : (
            <p className="text-gray-400">No specifications available</p>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-auto">
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
