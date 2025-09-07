# Khắc phục lỗi "Load failed" khi đăng nhập

## 🔍 **Nguyên nhân có thể**

### 1. **Backend không chạy**
- Spring Boot server chưa được khởi động
- Port 8080 bị chiếm dụng
- Database không kết nối được

### 2. **Cấu hình sai**
- API_BASE_URL không đúng
- CORS configuration
- Database connection

### 3. **Credentials sai**
- Username/password không đúng
- User không tồn tại trong database

## 🛠️ **Cách khắc phục**

### **Bước 1: Kiểm tra Backend**

```bash
# Kiểm tra backend có chạy không
curl http://localhost:8080/api/v1/products

# Nếu không có response, khởi động backend
cd backend
./mvnw spring-boot:run
```

### **Bước 2: Kiểm tra Database**

```bash
# Kiểm tra PostgreSQL có chạy không
brew services list | grep postgresql

# Khởi động PostgreSQL nếu cần
brew services start postgresql

# Tạo database nếu chưa có
psql -U postgres -c "CREATE DATABASE shop_management;"
```

### **Bước 3: Debug với Script**

1. Mở browser console (F12)
2. Copy và paste script debug:

```javascript
// Debug Login Script
const API_BASE_URL = 'http://localhost:8080/api/v1'

const debugLogin = {
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
  }
}

// Chạy test
debugLogin.testConnection().then(connected => {
  if (connected) {
    debugLogin.testLogin()
  }
})
```

### **Bước 4: Kiểm tra Credentials**

Sử dụng các credentials mẫu:

| Username | Password | Role |
|----------|----------|------|
| `admin` | `password123` | ADMIN |
| `staff1` | `password123` | STAFF |
| `customer1` | `password123` | CUSTOMER |
| `john_doe` | `password123` | CUSTOMER |

### **Bước 5: Kiểm tra Network**

```bash
# Kiểm tra port 8080
lsof -i :8080

# Kiểm tra firewall
sudo pfctl -sr | grep 8080
```

## 🚀 **Khởi động đúng cách**

### **Terminal 1: Backend**
```bash
cd backend
./mvnw spring-boot:run
```

### **Terminal 2: Frontend**
```bash
cd frontend
npm run dev
```

### **Kiểm tra**
- Backend: http://localhost:8080/api/v1/products
- Frontend: http://localhost:3000

## 🔧 **Cấu hình cần kiểm tra**

### **Backend (application.yml)**
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/shop_management
    username: postgres
    password: postgres
  liquibase:
    enabled: true
    change-log: classpath:db/changelog/db-changelog-master.xml
```

### **Frontend (api.ts)**
```typescript
const API_BASE_URL = 'http://localhost:8080/api/v1'
```

## 📋 **Checklist khắc phục**

- [ ] PostgreSQL đang chạy
- [ ] Database `shop_management` đã tạo
- [ ] Backend Spring Boot đang chạy trên port 8080
- [ ] Frontend đang chạy trên port 3000
- [ ] API endpoint `/api/v1/products` trả về data
- [ ] Credentials đúng (admin/password123)
- [ ] Không có CORS errors trong console
- [ ] Network tab trong DevTools không có failed requests

## 🆘 **Nếu vẫn lỗi**

1. **Kiểm tra logs backend**:
   ```bash
   cd backend
   ./mvnw spring-boot:run
   # Xem logs để tìm lỗi
   ```

2. **Kiểm tra browser console**:
   - Mở F12 → Console
   - Tìm error messages
   - Kiểm tra Network tab

3. **Reset database**:
   ```sql
   DROP DATABASE shop_management;
   CREATE DATABASE shop_management;
   ```

4. **Clear browser cache**:
   - Hard refresh (Ctrl+Shift+R)
   - Clear localStorage
   - Disable cache trong DevTools

## 📞 **Thông tin debug**

Khi gặp lỗi, hãy cung cấp:
1. Error message chính xác
2. Browser console logs
3. Network tab requests
4. Backend logs
5. Steps để reproduce lỗi
