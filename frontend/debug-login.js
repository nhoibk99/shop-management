// Debug Login Script
// Run this in browser console to debug login issues

const API_BASE_URL = 'http://localhost:8080/api/v1'

const debugLogin = {
  // Test server connection
  async testConnection() {
    console.log('🔍 Testing server connection...')
    try {
      const response = await fetch(`${API_BASE_URL}/products`)
      console.log('✅ Server is running:', response.status, response.statusText)
      return true
    } catch (error) {
      console.error('❌ Server connection failed:', error.message)
      return false
    }
  },

  // Test login endpoint
  async testLogin(username = 'admin', password = 'password123') {
    console.log(`🔐 Testing login with username: ${username}`)
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
      
      console.log('Response status:', response.status)
      console.log('Response headers:', Object.fromEntries(response.headers.entries()))
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ Login failed:', response.status, response.statusText)
        console.error('Error response:', errorText)
        return null
      }
      
      const data = await response.json()
      console.log('✅ Login successful:', data)
      return data
    } catch (error) {
      console.error('❌ Login error:', error.message)
      return null
    }
  },

  // Test with different credentials
  async testAllCredentials() {
    const credentials = [
      { username: 'admin', password: 'password123' },
      { username: 'staff1', password: 'password123' },
      { username: 'customer1', password: 'password123' },
      { username: 'john_doe', password: 'password123' }
    ]
    
    console.log('🧪 Testing all sample credentials...')
    for (const cred of credentials) {
      console.log(`\n--- Testing ${cred.username} ---`)
      await this.testLogin(cred.username, cred.password)
    }
  },

  // Check localStorage
  checkLocalStorage() {
    console.log('💾 Checking localStorage...')
    const token = localStorage.getItem('token')
    console.log('Current token:', token ? 'Present' : 'Not found')
    if (token) {
      console.log('Token preview:', token.substring(0, 20) + '...')
    }
  },

  // Clear localStorage
  clearStorage() {
    console.log('🧹 Clearing localStorage...')
    localStorage.removeItem('token')
    console.log('✅ localStorage cleared')
  },

  // Full diagnostic
  async runDiagnostic() {
    console.log('🚀 Running full login diagnostic...\n')
    
    // 1. Test connection
    const connected = await this.testConnection()
    if (!connected) {
      console.log('\n❌ Cannot proceed - server is not accessible')
      return
    }
    
    // 2. Check localStorage
    this.checkLocalStorage()
    
    // 3. Test login
    await this.testLogin()
    
    // 4. Test all credentials
    await this.testAllCredentials()
    
    console.log('\n✅ Diagnostic complete!')
  }
}

// Usage instructions
console.log(`
🔧 Login Debug Script

Usage:
1. Make sure backend is running on http://localhost:8080
2. Run: debugLogin.runDiagnostic()

Individual tests:
- debugLogin.testConnection()
- debugLogin.testLogin('admin', 'password123')
- debugLogin.testAllCredentials()
- debugLogin.checkLocalStorage()
- debugLogin.clearStorage()

Common issues:
- Backend not running: Start with 'cd backend && ./mvnw spring-boot:run'
- Wrong credentials: Use 'admin' / 'password123'
- CORS issues: Check backend CORS configuration
- Network issues: Check if port 8080 is accessible
`)

// Make debugLogin available globally
window.debugLogin = debugLogin
