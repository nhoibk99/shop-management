import Header from '../components/Header'

const UserProfile = () => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Header activePage="profile" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">User Profile</h1>
          <p className="text-gray-600">This page will show user profile information.</p>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
