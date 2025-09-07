import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { apiService, Product } from '../../services/api'

interface ProductState {
  products: Product[]
  currentProduct: Product | null
  loading: boolean
  error: string | null
}

const initialState: ProductState = {
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await apiService.getProducts()
    return response
  }
)

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: number) => {
    const response = await apiService.getProduct(id)
    return response
  }
)

export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (query: string) => {
    const response = await apiService.searchProducts(query)
    return response
  }
)

export const filterProducts = createAsyncThunk(
  'products/filterProducts',
  async (filters: {
    condition?: 'NEW' | 'USED'
    categoryId?: number
    minPrice?: number
    maxPrice?: number
    inStock?: boolean
  }) => {
    console.log('🔄 [Redux] filterProducts action dispatched with filters:', filters)
    const response = await apiService.filterProducts(filters)
    console.log('🔄 [Redux] filterProducts action completed, received', response.length, 'products')
    return response
  }
)

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (categoryId: number) => {
    const response = await apiService.getProductsByCategory(categoryId)
    return response
  }
)

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false
        state.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch products'
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false
        state.currentProduct = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch product'
      })
      .addCase(searchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false
        state.products = action.payload
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to search products'
      })
      .addCase(filterProducts.pending, (state) => {
        console.log('🔄 [Redux] filterProducts.pending - setting loading to true')
        state.loading = true
        state.error = null
      })
      .addCase(filterProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        console.log('🔄 [Redux] filterProducts.fulfilled - received', action.payload.length, 'products')
        state.loading = false
        state.products = action.payload
      })
      .addCase(filterProducts.rejected, (state, action) => {
        console.error('🔄 [Redux] filterProducts.rejected - error:', action.error.message)
        state.loading = false
        state.error = action.error.message || 'Failed to filter products'
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false
        state.products = action.payload
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch products by category'
      })
  },
})

export const { clearCurrentProduct, clearError } = productSlice.actions
export default productSlice.reducer
