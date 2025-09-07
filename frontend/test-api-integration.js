// API Integration Test Script
// Run this in browser console to test API integration

const API_BASE_URL = 'http://localhost:8080/api/v1'

// Test functions
const testAPI = {
  // Test authentication
  async testLogin() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'admin',
          password: 'password123'
        })
      })
      
      const data = await response.json()
      console.log('Login test:', data)
      return data.token
    } catch (error) {
      console.error('Login test failed:', error)
    }
  },

  // Test product fetching
  async testGetProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/products`)
      const data = await response.json()
      console.log('Products test:', data)
      return data
    } catch (error) {
      console.error('Products test failed:', error)
    }
  },

  // Test product search
  async testSearchProducts(query = 'iPhone') {
    try {
      const response = await fetch(`${API_BASE_URL}/products/search?query=${encodeURIComponent(query)}`)
      const data = await response.json()
      console.log('Search test:', data)
      return data
    } catch (error) {
      console.error('Search test failed:', error)
    }
  },

  // Test product filtering
  async testFilterProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/products/filter?condition=NEW`)
      const data = await response.json()
      console.log('Filter test:', data)
      return data
    } catch (error) {
      console.error('Filter test failed:', error)
    }
  },

  // Test categories
  async testGetCategories() {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`)
      const data = await response.json()
      console.log('Categories test:', data)
      return data
    } catch (error) {
      console.error('Categories test failed:', error)
    }
  },

  // Test order creation (requires authentication)
  async testCreateOrder(token) {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          orderItems: [
            {
              productId: 1,
              quantity: 1,
              price: 999.99
            }
          ]
        })
      })
      
      const data = await response.json()
      console.log('Order creation test:', data)
      return data
    } catch (error) {
      console.error('Order creation test failed:', error)
    }
  },

  // Run all tests
  async runAllTests() {
    console.log('🚀 Starting API Integration Tests...')
    
    // Test 1: Get products (no auth required)
    console.log('\n📱 Test 1: Get Products')
    await this.testGetProducts()
    
    // Test 2: Search products
    console.log('\n🔍 Test 2: Search Products')
    await this.testSearchProducts()
    
    // Test 3: Filter products
    console.log('\n🔧 Test 3: Filter Products')
    await this.testFilterProducts()
    
    // Test 4: Get categories
    console.log('\n📂 Test 4: Get Categories')
    await this.testGetCategories()
    
    // Test 5: Login
    console.log('\n🔐 Test 5: Login')
    const token = await this.testLogin()
    
    // Test 6: Create order (requires auth)
    if (token) {
      console.log('\n🛒 Test 6: Create Order')
      await this.testCreateOrder(token)
    }
    
    console.log('\n✅ All tests completed!')
  }
}

// Usage instructions
console.log(`
🧪 API Integration Test Script

Usage:
1. Make sure backend is running on http://localhost:8080
2. Open browser console on frontend page
3. Run: testAPI.runAllTests()

Individual tests:
- testAPI.testGetProducts()
- testAPI.testSearchProducts('iPhone')
- testAPI.testFilterProducts()
- testAPI.testGetCategories()
- testAPI.testLogin()
- testAPI.testCreateOrder(token)

Note: Some tests require authentication. Run testLogin() first to get a token.
`)

// Make testAPI available globally
window.testAPI = testAPI
