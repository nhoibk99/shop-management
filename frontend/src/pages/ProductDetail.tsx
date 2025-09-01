import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/slices/cartSlice'
import Header from '../components/Header'
import ProductImageGallery from '../components/ProductImageGallery'
import ProductInfo from '../components/ProductInfo'
import TabbedInfo from '../components/TabbedInfo'
import AccessoryCard from '../components/AccessoryCard'
import Footer from '../components/Footer'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  // Mock product data
  const product = {
    id: 1,
    name: 'iPhone 15 Pro Max (256GB, Natural Titanium)',
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop&flip=horizontal',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop&flip=vertical',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop&flip=both'
    ],
    badges: ['New Arrival', 'Best Seller'],
    originalPrice: 1299.00,
    discountedPrice: 1199.00,
    stock: 50,
    specifications: {
      display: '6.7-inch Super Retina XDR',
      storage: '256GB',
      battery: 'Up to 29 hours video playback',
      color: 'Natural Titanium',
      connectivity: '5G, Wi-Fi 6E, Bluetooth 5.3',
      processor: 'A17 Pro Bionic Chip',
      camera: '48MP Main, 12MP Ultra Wide, 12MP Telephoto',
      material: 'Titanium Frame',
      operatingSystem: 'iOS 17',
      waterResistance: 'IP68'
    },
    description: 'The iPhone 15 Pro Max represents the pinnacle of smartphone technology, featuring the most advanced A17 Pro chip, a revolutionary camera system, and the first-ever titanium design in an iPhone. With its stunning 6.7-inch Super Retina XDR display and up to 29 hours of video playback, this device sets new standards for performance and innovation.',
    reviews: [
      {
        id: 1,
        author: 'John Smith',
        rating: 5,
        comment: 'Absolutely love this phone! The camera quality is incredible and the titanium build feels premium.',
        date: '2024-01-15'
      },
      {
        id: 2,
        author: 'Sarah Johnson',
        rating: 5,
        comment: 'Best iPhone I\'ve ever owned. The battery life is amazing and the performance is lightning fast.',
        date: '2024-01-10'
      },
      {
        id: 3,
        author: 'Mike Davis',
        rating: 4,
        comment: 'Great phone overall, but wish it had USB-C. The camera and performance are top-notch.',
        date: '2024-01-08'
      }
    ],
    warranty: 'This product comes with Apple\'s standard 1-year limited warranty. Extended warranty options are available for purchase. We offer a 30-day return policy for any reason, with full refund or exchange. All products are thoroughly tested and certified before shipping.'
  }

  // Mock related accessories
  const relatedAccessories = [
    {
      id: 1,
      name: 'Apple MagSafe Charger',
      price: 39.00,
      image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop',
      badge: 'New'
    },
    {
      id: 2,
      name: 'iPhone 15 Pro Max Case',
      price: 49.00,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
      badge: 'Best Seller'
    },
    {
      id: 3,
      name: 'Screen Protector',
      price: 19.00,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
      badge: 'Limited Stock'
    },
    {
      id: 4,
      name: 'Lightning to USB-C Cable',
      price: 29.00,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop'
    }
  ]

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [id])

  const handleAddToCart = (quantity: number) => {
    // Add item to cart using Redux
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.discountedPrice,
      quantity: quantity,
      image: product.images[0]
    }))
    
    // Redirect to cart page
    navigate('/cart')
  }

  const handleBuyNow = (quantity: number) => {
    // Add item to cart first
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.discountedPrice,
      quantity: quantity,
      image: product.images[0]
    }))
    
    // Then redirect to checkout
    navigate('/checkout')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
        <Header activePage="new-phones" />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Header activePage="new-phones" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Product Images */}
          <div>
            <ProductImageGallery 
              images={product.images} 
              productName={product.name} 
            />
          </div>

          {/* Right Column - Product Info */}
          <div>
            <ProductInfo
              name={product.name}
              badges={product.badges}
              originalPrice={product.originalPrice}
              discountedPrice={product.discountedPrice}
              stock={product.stock}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
          </div>
        </div>

        {/* Tabbed Information Section */}
        <div className="mb-16">
          <TabbedInfo
            specifications={product.specifications}
            description={product.description}
            reviews={product.reviews}
            warranty={product.warranty}
          />
        </div>

        {/* Related Accessories Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Accessories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedAccessories.map((accessory) => (
              <AccessoryCard
                key={accessory.id}
                id={accessory.id}
                name={accessory.name}
                price={accessory.price}
                image={accessory.image}
                badge={accessory.badge}
              />
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default ProductDetail
