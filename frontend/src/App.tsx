import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import UserProfile from './pages/UserProfile'
import AdminDashboard from './pages/AdminDashboard'
import NewPhones from './pages/NewPhones'
import UsedPhones from './pages/UsedPhones'
import Default from './pages/Default'
import About from './pages/About'
import FlashSale from './pages/FlashSale'
import MyInfo from './pages/MyInfo'

function App() {
  return (
    <>
      {/* Pages with their own Header (no Layout wrapper needed) */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/new-phones" element={<NewPhones />} />
        <Route path="/used-phones" element={<UsedPhones />} />
        <Route path="/accessories" element={<Default pageName="Accessories" description="Discover a wide range of mobile accessories including cases, chargers, headphones, and more." />} />
        <Route path="/about" element={<About />} />
        <Route path="/flash-sale" element={<FlashSale />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/my-info" element={<MyInfo />} />
        
        {/* All pages now have their own Header, Layout component is no longer needed */}
      </Routes>
    </>
  )
}

export default App
