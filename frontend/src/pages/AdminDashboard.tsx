import Header from '../components/Header'

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Header activePage="admin" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
          <p className="text-gray-600">This page will show admin management tools and statistics.</p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
