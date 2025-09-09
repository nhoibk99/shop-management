const API_BASE_URL = 'http://localhost:8080/api/v1'

// Types
export interface User {
  id: number
  username: string
  email: string
  role: 'ADMIN' | 'STAFF' | 'CUSTOMER'
  createdAt: string
}

export interface AuthResponse {
  token: string
  user: User
  message: string
}

export interface Product {
  id: number
  name: string
  description?: string
  price: number
  oldPrice?: number
  condition: 'NEW' | 'USED'
  stock: number
  categoryId: number
  imageUrl?: string
  images?: string[]
  tags?: string[]
  specs?: any // Keep for backward compatibility
  specifications?: Record<string, string> // New specifications field
  warrantyAndReturnPolicy?: string
  reviews?: Review[]
  label?: string
  labelText?: string
  category?: {
    id: number
    name: string
  }
}

export interface Category {
  id: number
  name: string
}

export interface Review {
  id: number
  authorName: string
  rating: number
  comment: string
  createdAt: string
}

export interface OrderItem {
  productId: number
  quantity: number
  price: number
}

export interface Order {
  id: number
  userId: number
  status: string
  totalAmount: number
  shippingAddress?: string
  shippingMethod?: string
  paymentMethod?: string
  createdAt: string
  updatedAt: string
  orderItems?: OrderItem[]
}

export interface CreateOrderRequest {
  orderItems: OrderItem[]
}

// Helper function to get auth token
const getAuthToken = (): string | null => {
  const token = localStorage.getItem('token')
  console.log('🔑 [API] Token status:', token ? 'Present' : 'Not found')
  if (token) {
    console.log('🔑 [API] Token length:', token.length)
    console.log('🔑 [API] Token preview:', token.substring(0, 20) + '...')
  }
  return token
}

// Debug function to check localStorage
const debugLocalStorage = () => {
  console.log('🔍 [API] LocalStorage contents:')
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key) {
      const value = localStorage.getItem(key)
      console.log(`🔍 [API] ${key}:`, value ? value.substring(0, 50) + '...' : 'null')
    }
  }
}

// Global error handler
const handleApiError = (error: any, context: string) => {
  console.error(`❌ [API] ${context} error:`, {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString()
  })
  
  // Log to console with more details
  if (error.response) {
    console.error('❌ [API] Response error:', error.response.status, error.response.statusText)
  } else if (error.request) {
    console.error('❌ [API] Network error - no response received')
  } else {
    console.error('❌ [API] Request setup error:', error.message)
  }
}

// Performance logging utility
const logPerformance = (startTime: number, action: string) => {
  const endTime = performance.now()
  const duration = endTime - startTime
  console.log(`⏱️ [API] ${action} took ${duration.toFixed(2)}ms`)
}

// Helper function to get headers
const getHeaders = (includeAuth: boolean = true): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  
  if (includeAuth) {
    const token = getAuthToken()
    if (token) {
      headers.Authorization = `Bearer ${token}`
      console.log('🔑 [API] Authorization header added:', `Bearer ${token.substring(0, 20)}...`)
    } else {
      console.log('🔑 [API] No token found, skipping Authorization header')
    }
  } else {
    console.log('🔑 [API] Auth not requested, skipping Authorization header')
  }
  
  console.log('🔑 [API] Final headers:', headers)
  return headers
}

// API Service Class
class ApiService {
  // Debug authentication state
  debugAuthState() {
    console.log('🔍 [API] Current authentication state:')
    console.log('🔍 [API] localStorage token:', localStorage.getItem('token') ? 'Present' : 'Not found')
    console.log('🔍 [API] localStorage keys:', Object.keys(localStorage))
  }

  // Authentication APIs
  async login(username: string, password: string): Promise<AuthResponse> {
    console.log('🔐 [API] Login attempt for user:', username)
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify({ username, password }),
      })
      
      console.log('🔐 [API] Login response status:', response.status)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const errorMessage = errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`
        console.error('🔐 [API] Login failed:', errorMessage)
        throw new Error(errorMessage)
      }
      
      const result = await response.json()
      console.log('🔐 [API] Login successful for user:', result.user?.username)
      return result
    } catch (error) {
      console.error('🔐 [API] Login error:', error)
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Network error: Unable to connect to server')
    }
  }

  async register(username: string, password: string, email: string): Promise<AuthResponse> {
    console.log('📝 [API] Registration attempt for user:', username, 'email:', email)
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify({ username, password, email }),
      })
      
      console.log('📝 [API] Registration response status:', response.status)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const errorMessage = errorData.message || errorData.error || 'Registration failed'
        console.error('📝 [API] Registration failed:', errorMessage)
        throw new Error(errorMessage)
      }
      
      const result = await response.json()
      console.log('📝 [API] Registration successful for user:', result.user?.username)
      return result
    } catch (error) {
      console.error('📝 [API] Registration error:', error)
      throw error
    }
  }

  // Product APIs
  async getProducts(): Promise<Product[]> {
    console.log('📦 [API] Fetching all products')
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        headers: getHeaders(true), // Include auth token if available
      })
      
      console.log('📦 [API] Get products response status:', response.status)
      
      if (!response.ok) {
        console.error('📦 [API] Failed to fetch products:', response.status, response.statusText)
        throw new Error('Failed to fetch products')
      }
      
      const products = await response.json()
      console.log('📦 [API] Successfully fetched', products.length, 'products')
      return products
    } catch (error) {
      console.error('📦 [API] Get products error:', error)
      throw error
    }
  }

  async getProduct(id: number): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      headers: getHeaders(true), // Include auth token if available
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch product')
    }
    
    return response.json()
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products/category/${categoryId}`, {
      headers: getHeaders(true), // Include auth token if available
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch products by category')
    }
    
    return response.json()
  }

  async searchProducts(query: string): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products/search?query=${encodeURIComponent(query)}`, {
      headers: getHeaders(true), // Include auth token if available
    })
    
    if (!response.ok) {
      throw new Error('Failed to search products')
    }
    
    return response.json()
  }

  async filterProducts(filters: {
    condition?: 'NEW' | 'USED'
    categoryId?: number
    minPrice?: number
    maxPrice?: number
    inStock?: boolean
  }): Promise<Product[]> {
    const startTime = performance.now()
    console.log('🔍 [API] Filtering products with filters:', filters)
    
    // Debug localStorage contents
    debugLocalStorage()
    
    // Debug authentication state
    this.debugAuthState()
    
    const params = new URLSearchParams()
    
    if (filters.condition) params.append('condition', filters.condition)
    if (filters.categoryId) params.append('categoryId', filters.categoryId.toString())
    if (filters.minPrice) params.append('minPrice', filters.minPrice.toString())
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString())
    if (filters.inStock !== undefined) params.append('inStock', filters.inStock.toString())
    
    const url = `${API_BASE_URL}/products/filter?${params}`
    console.log('🔍 [API] Filter URL:', url)
    
    try {
      const response = await fetch(url, {
        headers: getHeaders(true), // Include auth token if available
      })
      
      console.log('🔍 [API] Filter products response status:', response.status)
      
      if (!response.ok) {
        console.error('🔍 [API] Failed to filter products:', response.status, response.statusText)
        const errorText = await response.text()
        console.error('🔍 [API] Error response body:', errorText)
        throw new Error('Failed to filter products')
      }
      
      const products = await response.json()
      console.log('🔍 [API] Successfully filtered', products.length, 'products for condition:', filters.condition)
      logPerformance(startTime, 'Filter products')
      return products
    } catch (error) {
      handleApiError(error, 'Filter products')
      logPerformance(startTime, 'Filter products (failed)')
      throw error
    }
  }

  // Category APIs
  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      headers: getHeaders(true), // Include auth token if available
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }
    
    return response.json()
  }

  async getCategory(id: number): Promise<Category> {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      headers: getHeaders(true), // Include auth token if available
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch category')
    }
    
    return response.json()
  }

  // Order APIs
  async getMyOrders(): Promise<Order[]> {
    const response = await fetch(`${API_BASE_URL}/orders/my-orders`, {
      headers: getHeaders(),
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch orders')
    }
    
    return response.json()
  }

  async getOrder(id: number): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      headers: getHeaders(),
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch order')
    }
    
    return response.json()
  }

  async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(orderData),
    })
    
    if (!response.ok) {
      throw new Error('Failed to create order')
    }
    
    return response.json()
  }

  // User APIs
  async getCurrentUser(): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      headers: getHeaders(),
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch user')
    }
    
    return response.json()
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(userData),
    })
    
    if (!response.ok) {
      throw new Error('Failed to update user')
    }
    
    return response.json()
  }
}

// Export singleton instance
export const apiService = new ApiService()

// Global function to check authentication state
export const checkAuthState = () => {
  console.log('🔍 [API] Checking authentication state...')
  const token = localStorage.getItem('token')
  console.log('🔍 [API] Token exists:', !!token)
  if (token) {
    console.log('🔍 [API] Token length:', token.length)
    console.log('🔍 [API] Token preview:', token.substring(0, 20) + '...')
  }
  console.log('🔍 [API] All localStorage keys:', Object.keys(localStorage))
  return !!token
}

export default apiService
