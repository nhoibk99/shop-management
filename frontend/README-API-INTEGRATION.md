# API Integration Guide

This document explains how the frontend has been integrated with the backend API.

## Overview

The frontend now uses real API calls instead of mock data for:
- Authentication (Login/Register)
- Product management (CRUD operations)
- Order management
- Search functionality
- Cart operations

## API Service

### Location
`src/services/api.ts`

### Features
- Centralized API configuration
- JWT token management
- Type-safe API calls
- Error handling
- Base URL configuration

### Usage
```typescript
import { apiService } from '../services/api'

// Get all products
const products = await apiService.getProducts()

// Search products
const results = await apiService.searchProducts('iPhone')

// Filter products
const filtered = await apiService.filterProducts({ condition: 'NEW' })
```

## Redux Integration

### Updated Slices

#### 1. AuthSlice (`src/store/slices/authSlice.ts`)
- **Login**: `dispatch(login({ username, password }))`
- **Register**: `dispatch(register({ username, email, password }))`
- **Logout**: `dispatch(logout())`

#### 2. ProductSlice (`src/store/slices/productSlice.ts`)
- **Fetch Products**: `dispatch(fetchProducts())`
- **Search Products**: `dispatch(searchProducts(query))`
- **Filter Products**: `dispatch(filterProducts(filters))`
- **Get Product by ID**: `dispatch(fetchProductById(id))`
- **Get Products by Category**: `dispatch(fetchProductsByCategory(categoryId))`

#### 3. CartSlice (`src/store/slices/cartSlice.ts`)
- **Add to Cart**: `dispatch(addToCart(item))`
- **Remove from Cart**: `dispatch(removeFromCart(itemId))`
- **Update Quantity**: `dispatch(updateQuantity({ id, quantity }))`
- **Clear Cart**: `dispatch(clearCart())`
- **Create Order**: `dispatch(createOrder(orderData))`

## Page Updates

### 1. NewPhones Page
- Uses `filterProducts({ condition: 'NEW' })` to fetch new phones
- Displays real product data from API
- Supports pagination and sorting

### 2. UsedPhones Page
- Uses `filterProducts({ condition: 'USED' })` to fetch used phones
- Displays real product data from API
- Supports pagination and sorting

### 3. Login Page
- Integrated with Redux auth slice
- Real authentication with JWT tokens
- Error handling and loading states

### 4. Register Page
- Integrated with Redux auth slice
- Real user registration
- Password confirmation validation

### 5. Cart Page
- Real cart operations
- Order creation with API
- Loading states and error handling

### 6. Header Component
- Search functionality with API
- Real cart data display
- Authentication state management

## API Endpoints Used

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration

### Products
- `GET /api/v1/products` - Get all products
- `GET /api/v1/products/{id}` - Get product by ID
- `GET /api/v1/products/search?query={term}` - Search products
- `GET /api/v1/products/filter` - Filter products
- `GET /api/v1/products/category/{id}` - Get products by category

### Categories
- `GET /api/v1/categories` - Get all categories
- `GET /api/v1/categories/{id}` - Get category by ID

### Orders
- `GET /api/v1/orders/my-orders` - Get user's orders
- `GET /api/v1/orders/{id}` - Get order by ID
- `POST /api/v1/orders` - Create new order

### Users
- `GET /api/v1/users/me` - Get current user
- `PUT /api/v1/users/{id}` - Update user

## Configuration

### API Base URL
```typescript
const API_BASE_URL = 'http://localhost:8080/api/v1'
```

### JWT Token Management
- Tokens are stored in localStorage
- Automatically included in API requests
- Handled by Redux auth slice

## Error Handling

### API Level
- Network errors
- HTTP status codes
- Response validation

### Redux Level
- Loading states
- Error messages
- Success notifications

### UI Level
- Error displays
- Loading spinners
- User feedback

## Data Flow

1. **User Action** → Component
2. **Component** → Redux Action
3. **Redux Action** → API Service
4. **API Service** → Backend API
5. **Backend Response** → Redux State
6. **Redux State** → Component Re-render

## Example Usage

### Search Products
```typescript
// In component
const handleSearch = (query: string) => {
  dispatch(searchProducts(query))
}

// In Redux slice
export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (query: string) => {
    const response = await apiService.searchProducts(query)
    return response
  }
)
```

### Create Order
```typescript
// In component
const handleCheckout = () => {
  const orderItems = cartItems.map(item => ({
    productId: item.id,
    quantity: item.quantity,
    price: item.price
  }))
  
  dispatch(createOrder({ orderItems }))
}
```

## Testing

### Manual Testing
1. Start backend server: `cd backend && ./mvnw spring-boot:run`
2. Start frontend: `cd frontend && npm run dev`
3. Test authentication, product listing, search, cart operations

### API Testing
- Use Postman collection: `Shop_Management_API_Postman_Collection.json`
- Test all endpoints manually
- Verify data consistency

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend CORS is configured
   - Check API base URL

2. **Authentication Issues**
   - Verify JWT token in localStorage
   - Check token expiration

3. **Data Not Loading**
   - Check network requests in DevTools
   - Verify API endpoints are working
   - Check Redux state

4. **Type Errors**
   - Ensure API types match backend DTOs
   - Update TypeScript interfaces

### Debug Tools
- Redux DevTools Extension
- Network tab in browser DevTools
- Console logs for debugging

## Next Steps

1. **Error Boundaries**: Add React error boundaries
2. **Offline Support**: Implement service workers
3. **Caching**: Add API response caching
4. **Optimistic Updates**: Improve UX with optimistic updates
5. **Real-time Updates**: Add WebSocket support for real-time updates

## Dependencies

### Required Packages
- `@reduxjs/toolkit` - Redux state management
- `react-redux` - React Redux bindings
- `react-router-dom` - Routing
- `axios` - HTTP client (if needed)

### Development Dependencies
- `@types/react` - TypeScript types
- `@types/react-dom` - TypeScript types
- `typescript` - TypeScript compiler
