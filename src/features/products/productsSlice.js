import { createSlice } from '@reduxjs/toolkit'
import { getProducts, updateProduct, deleteProduct } from './productsThunks'

const initialState = {
  products: [],
  status: 'idle',
  error: null,
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all products
    builder.addCase(getProducts.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.products = action.payload
    })
    builder.addCase(getProducts.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
    // Update product
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const productIndex = state.products.findIndex(
        (product) => product.id === action.payload.id
      )
      if (productIndex !== -1) {
        state.products[productIndex] = action.payload
      }
      state.status = 'succeeded'
    })
    // Delete product
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      )
      state.status = 'succeeded'
    })
  },
})

export const selectProducts = (state) => state.products.products

export const selectProductsLoading = (state) =>
  state.products.status === 'loading'

export default productsSlice.reducer
