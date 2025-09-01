import { useParams } from 'react-router-dom'

const ProductDetail = () => {
  const { id } = useParams()

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Product Detail</h1>
      <p className="text-gray-600">Product ID: {id}</p>
      <p className="text-gray-600">This page will show detailed product information.</p>
    </div>
  )
}

export default ProductDetail
