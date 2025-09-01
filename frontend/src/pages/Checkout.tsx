import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CheckoutProgress from '../components/CheckoutProgress'
import ShippingAddressForm, { ShippingAddressData } from '../components/ShippingAddressForm'
import OrderSummaryCard from '../components/OrderSummaryCard'

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [, setShippingData] = useState<ShippingAddressData | null>(null)

  // Sample cart data for demonstration
  const sampleCartItems = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      variant: "256GB - Natural Titanium",
      price: 1199.99,
      quantity: 1,
      image: "/sample-phone.jpg"
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      variant: "512GB - Titanium Black",
      price: 1299.99,
      quantity: 1,
      image: "/sample-phone-2.jpg"
    },
    {
      id: 3,
      name: "AirPods Pro (2nd Gen)",
      variant: "USB-C",
      price: 249.99,
      quantity: 2,
      image: "/sample-airpods.jpg"
    }
  ]

  const handleShippingNext = (data: ShippingAddressData) => {
    setShippingData(data)
    setCurrentStep(2)
  }

  const handleUpdateQuantity = (id: number, quantity: number) => {
    // In a real app, this would update the cart state
    console.log(`Update item ${id} quantity to ${quantity}`)
  }

  const handleRemoveItem = (id: number) => {
    // In a real app, this would remove the item from cart
    console.log(`Remove item ${id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Header activePage="checkout" />
      
      {/* Checkout Progress */}
      <CheckoutProgress currentStep={currentStep} />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <ShippingAddressForm onNext={handleShippingNext} />
            )}
            
            {currentStep === 2 && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Shipping Method
                </h2>
                <p className="text-gray-600">
                  This step will contain shipping method selection options.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}
            
            {currentStep === 3 && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Payment Selection
                </h2>
                <p className="text-gray-600">
                  This step will contain payment method selection options.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Continue to Review
                  </button>
                </div>
              </div>
            )}
            
            {currentStep === 4 && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Order Review
                </h2>
                <p className="text-gray-600">
                  This step will contain the final order review and confirmation.
                </p>
                <div className="mt-6">
                  <button
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummaryCard 
              items={sampleCartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default Checkout
