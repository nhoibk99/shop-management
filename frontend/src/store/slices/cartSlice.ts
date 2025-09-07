import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { apiService, CreateOrderRequest } from '../../services/api'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image?: string
}

interface CartState {
  items: CartItem[]
  total: number
  loading: boolean
  error: string | null
}

const initialState: CartState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
}

export const createOrder = createAsyncThunk(
  'cart/createOrder',
  async (orderData: CreateOrderRequest) => {
    console.log('🛒 [Redux] createOrder action dispatched with order data:', orderData)
    const response = await apiService.createOrder(orderData)
    console.log('🛒 [Redux] createOrder action completed successfully')
    return response
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      console.log('🛒 [Redux] addToCart action dispatched:', action.payload)
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += action.payload.quantity
        console.log('🛒 [Redux] Updated existing item quantity to:', existingItem.quantity)
      } else {
        state.items.push(action.payload)
        console.log('🛒 [Redux] Added new item to cart')
      }
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      console.log('🛒 [Redux] Cart total updated to:', state.total)
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id)
      if (item) {
        item.quantity = action.payload.quantity
        state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      }
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.loading = false
        state.items = []
        state.total = 0
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to create order'
      })
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart, clearError } = cartSlice.actions
export default cartSlice.reducer
