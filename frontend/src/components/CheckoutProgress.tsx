import { Check } from 'lucide-react'

interface CheckoutProgressProps {
  currentStep: number
}

const steps = [
  { id: 1, name: 'Shipping Address', description: 'Enter your delivery details' },
  { id: 2, name: 'Shipping Method', description: 'Choose delivery option' },
  { id: 3, name: 'Payment Selection', description: 'Select payment method' },
  { id: 4, name: 'Order Review', description: 'Review and confirm order' }
]

const CheckoutProgress = ({ currentStep }: CheckoutProgressProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            {/* Step Circle */}
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors duration-200 ${
                  currentStep >= step.id
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}
              >
                {currentStep > step.id ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </div>
            </div>

            {/* Step Info */}
            <div className="ml-3 hidden sm:block">
              <p
                className={`text-sm font-medium ${
                  currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                {step.name}
              </p>
              <p className="text-xs text-gray-400">{step.description}</p>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`hidden sm:block w-16 h-0.5 mx-4 transition-colors duration-200 ${
                  currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Mobile Progress Bar */}
      <div className="mt-4 sm:hidden">
        <div className="flex items-center">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>
          <span className="ml-3 text-sm text-gray-600">
            Step {currentStep} of {steps.length}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CheckoutProgress
