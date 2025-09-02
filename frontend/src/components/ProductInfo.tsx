import { useState } from 'react'

interface ProductInfoProps {
  name: string
  badges: string[]
  originalPrice: number
  discountedPrice: number
  stock: number
  onAddToCart: (quantity: number) => void
  onBuyNow: (quantity: number) => void
}

const ProductInfo = ({ 
  name, 
  badges, 
  originalPrice, 
  discountedPrice, 
  stock, 
  onAddToCart, 
  onBuyNow 
}: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1)

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, Math.min(stock, quantity + change))
    setQuantity(newQuantity)
  }

  const handleAddToCart = () => {
    onAddToCart(quantity)
  }

  const handleBuyNow = () => {
    onBuyNow(quantity)
  }

  return (
    <div className="space-y-6">
      {/* Product Title */}
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
        {name}
      </h1>

      {/* Badges */}
      {badges.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {badges.map((badge, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800"
            >
              {badge}
            </span>
          ))}
        </div>
      )}

      {/* Price Section */}
      <div className="space-y-2">
        {originalPrice > discountedPrice && (
          <p className="text-lg text-gray-500 line-through">
            ${originalPrice.toFixed(2)}
          </p>
        )}
        <p className="text-3xl lg:text-4xl font-bold text-blue-600">
          ${discountedPrice.toFixed(2)}
        </p>
      </div>

      {/* Stock Availability */}
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className={`text-sm font-medium ${stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {stock > 0 ? `In Stock (${stock} available)` : 'Out of Stock'}
        </span>
      </div>

      {/* Quantity Selector */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">Quantity:</label>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          
          <span className="w-16 h-10 border border-gray-300 rounded-lg flex items-center justify-center text-lg font-medium text-gray-900">
            {quantity}
          </span>
          
          <button
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= stock}
            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleAddToCart}
          disabled={stock === 0}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          disabled={stock === 0}
          className="flex-1 border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-lg font-medium hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Buy Now
        </button>
      </div>
    </div>
  )
}

export default ProductInfo
