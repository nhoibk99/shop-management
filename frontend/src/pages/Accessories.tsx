import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { fetchProducts } from '../store/slices/productSlice'
import AccessoryCard from '../components/AccessoryCard'

const Accessories = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { products, loading } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const accessories = products.filter(product => 
    product.categoryName && ['Headphones', 'Chargers', 'Cases', 'Smartwatches', 'Earbuds', 'Power Banks', 'Screen Protectors'].includes(product.categoryName)
  )

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Accessories</h1>
        <p className="text-xl text-gray-600">
          Essential accessories to enhance your mobile experience
        </p>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accessories.map((product) => (
            <AccessoryCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop'}
              badge="ACCESSORY"
              labelVariant="featured"
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Accessories
