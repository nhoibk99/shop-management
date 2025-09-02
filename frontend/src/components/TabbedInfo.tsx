import { useState } from 'react'

interface TabbedInfoProps {
  specifications: Record<string, string>
  description: string
  reviews: Array<{
    id: number
    author: string
    rating: number
    comment: string
    date: string
  }>
  warranty: string
}

const TabbedInfo = ({ specifications, description, reviews, warranty }: TabbedInfoProps) => {
  const [activeTab, setActiveTab] = useState('specifications')

  const tabs = [
    { id: 'specifications', label: 'Specifications' },
    { id: 'description', label: 'Description' },
    { id: 'reviews', label: `Reviews (${reviews.length})` },
    { id: 'warranty', label: 'Warranty & Return' }
  ]

  const renderSpecifications = () => (
    <div className="grid md:grid-cols-2 gap-4">
      {Object.entries(specifications).map(([key, value]) => (
        <div key={key} className="flex">
          <dt className="w-1/3 font-medium text-gray-700 capitalize">
            {key.replace(/([A-Z])/g, ' $1').trim()}:
          </dt>
          <dd className="w-2/3 text-gray-600">{value}</dd>
        </div>
      ))}
    </div>
  )

  const renderDescription = () => (
    <div className="prose max-w-none">
      <p className="text-gray-700 leading-relaxed">{description}</p>
    </div>
  )

  const renderReviews = () => (
    <div className="space-y-6">
      {reviews.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review this product!</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">{review.author}</h4>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-gray-600 mb-2">{review.comment}</p>
            <p className="text-sm text-gray-500">{review.date}</p>
          </div>
        ))
      )}
    </div>
  )

  const renderWarranty = () => (
    <div className="prose max-w-none">
      <p className="text-gray-700 leading-relaxed">{warranty}</p>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'specifications':
        return renderSpecifications()
      case 'description':
        return renderDescription()
      case 'reviews':
        return renderReviews()
      case 'warranty':
        return renderWarranty()
      default:
        return renderSpecifications()
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  )
}

export default TabbedInfo
