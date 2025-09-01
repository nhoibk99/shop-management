import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Label } from '../components/ui/label'

const LandingPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  })

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else {
          return { hours: 23, minutes: 59, seconds: 59 }
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Sample data
  const categories = [
    { name: 'Phones', icon: '📱', color: 'bg-blue-100' },
    { name: 'Headphones', icon: '🎧', color: 'bg-green-100' },
    { name: 'Chargers', icon: '🔌', color: 'bg-yellow-100' },
    { name: 'Cases', icon: '📱', color: 'bg-purple-100' },
    { name: 'Smartwatches', icon: '⌚', color: 'bg-red-100' },
    { name: 'Earbuds', icon: '🎵', color: 'bg-indigo-100' },
    { name: 'Power Banks', icon: '🔋', color: 'bg-orange-100' },
    { name: 'Screen Protectors', icon: '🛡️', color: 'bg-pink-100' }
  ]

  const featuredProducts = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      price: '$999',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
      tag: 'NEW',
      tagColor: 'bg-green-500'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24',
      price: '$899',
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=300&fit=crop',
      tag: 'NEW',
      tagColor: 'bg-green-500'
    },
    {
      id: 3,
      name: 'AirPods Pro',
      price: '$249',
      image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop',
      tag: 'NEW',
      tagColor: 'bg-green-500'
    }
  ]

  const features = [
    {
      icon: '🛡️',
      title: 'Certified Warranty',
      description: 'All products come with our certified warranty for peace of mind.'
    },
    {
      icon: '🔄',
      title: 'Easy Returns',
      description: '30-day hassle-free returns on all purchases.'
    },
    {
      icon: '🚚',
      title: 'Fast & Free Shipping',
      description: 'Free shipping on orders over $50 with 2-day delivery.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Header activePage="home" />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-50 to-indigo-50 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Phone Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-3xl transform rotate-6 opacity-20"></div>
                <img
                  src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop"
                  alt="Latest Smartphone"
                  className="relative rounded-3xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Right: Content */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Your Next Mobile Device,{' '}
                <span className="text-blue-600">Found Here.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Discover an extensive selection of new and used smartphones, accessories, and tech gadgets. 
                Quality guaranteed with competitive prices and excellent customer service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/new-phones"
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Shop New Phones
                </Link>
                <Link
                  to="/used-phones"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Shop Used Phones
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Categories */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600">
              Find exactly what you need in our organized categories
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`${category.color} rounded-2xl p-6 text-center hover:shadow-lg transition duration-200 cursor-pointer transform hover:-translate-y-2`}
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-800">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Handpicked devices and accessories for you
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-200 transform hover:-translate-y-2"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <Label 
                    variant={product.tag === 'NEW' ? 'new' : product.tag === 'USED' ? 'old' : 'default'}
                    className="absolute top-4 right-4"
                  >
                    {product.tag}
                  </Label>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold text-blue-600">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sale Section */}
      <section className="py-12 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <h2 className="text-4xl lg:text-5xl font-bold text-blue-600 mb-6">
              Flash Sale Alert! ⚡
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Limited time offers on premium devices. Don't miss out on these incredible deals!
            </p>
            
            {/* Countdown Timer */}
            <div className="flex justify-center space-x-4 mb-6">
              <div className="bg-blue-600 text-white rounded-lg p-4 min-w-[80px]">
                <div className="text-3xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
                <div className="text-sm">Hours</div>
              </div>
              <div className="bg-blue-600 text-white rounded-lg p-4 min-w-[80px]">
                <div className="text-3xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                <div className="text-sm">Minutes</div>
              </div>
              <div className="bg-blue-600 text-white rounded-lg p-4 min-w-[80px]">
                <div className="text-3xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                <div className="text-sm">Seconds</div>
              </div>
            </div>
            
            <Link
              to="/flash-sale"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-blue-600 bg-blue-100 hover:bg-blue-200 transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Shop Now & Save Big! 🛒
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose MobileMart?
            </h2>
            <p className="text-xl text-gray-600">
              We're committed to providing the best shopping experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition duration-200 transform hover:-translate-y-2"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default LandingPage
