import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/slices/cartSlice'
import { Label } from './ui/label'

interface ProductCardProps {
  id: number
  name: string
  price: number
  image: string
  specs: {
    storage?: string
    color: string
    screenSize: string
  }
  label?: 'new' | 'old' | 'sale' | 'featured'
  labelText?: string
}

const ProductCard = ({ id, name, price, image, specs, label = 'new', labelText }: ProductCardProps) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleCardClick = () => {
    navigate(`/products/${id}`)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    
    // Add item to cart using Redux
    dispatch(addToCart({
      id: id,
      name: name,
      price: price,
      quantity: 1,
      image: image
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
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
        />
        <Label 
          variant={label} 
          className="absolute top-3 right-3"
        >
          {labelText || (label === 'new' ? 'NEW' : label === 'old' ? 'OLD' : label.toUpperCase())}
        </Label>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {name}
        </h3>
        
        <div className="text-sm text-gray-600 space-y-1 mb-4 flex-grow">
          {specs.storage && (
            <p>{specs.storage}</p>
          )}
          <p>{specs.color}</p>
          <p>{specs.screenSize}</p>
        </div>
        
        <div className="flex justify-between items-center mt-auto">
          <span className="text-xl font-bold text-blue-600">
            ${price.toFixed(2)}
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
