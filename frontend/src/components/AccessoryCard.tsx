import { useNavigate } from 'react-router-dom'
import { Label } from './ui/label'

interface AccessoryCardProps {
  id: number
  name: string
  price: number
  image: string
  badge?: string
  labelVariant?: 'new' | 'old' | 'sale' | 'featured' | 'default'
}

const AccessoryCard = ({ id, name, price, image, badge, labelVariant = 'default' }: AccessoryCardProps) => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/products/${id}`)
  }
  return (
    <div 
      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-32 object-cover"
        />
        {badge && (
          <Label 
            variant={labelVariant}
            className="absolute top-2 right-2"
          >
            {badge}
          </Label>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 text-sm">
          {name}
        </h3>
        <p className="text-lg font-bold text-blue-600">
          ${price.toFixed(2)}
        </p>
      </div>
    </div>
  )
}

export default AccessoryCard
