import { createSlice } from '@reduxjs/toolkit'
import {
  getPurchases,
  // getPurchasesByProductId,
  // getPurchasesByCustomerId,
  getPurchasesOfProduct,
  getPurchasesOfCustomer,
  addPurchaseToCustomer,
  deletePurchasesOfProduct,
  deletePurchasesOfCustomer,
} from './purchasesThunks'

const initialState = {
  purchases: [],
  purchasesOfProduct: {},
  purchasesOfCustomer: {},
  status: 'idle',
  error: null,
}

export const purchasesSlice = createSlice({
  name: 'purchases',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPurchases.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(getPurchases.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.purchases = action.payload
    })
    builder.addCase(getPurchases.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })

    builder.addCase(getPurchasesOfProduct.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(getPurchasesOfProduct.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.purchasesOfProduct[action.meta.arg] = action.payload
    })
    builder.addCase(getPurchasesOfProduct.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })

    builder.addCase(getPurchasesOfCustomer.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(getPurchasesOfCustomer.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.purchasesOfCustomer[action.meta.arg] = action.payload
    })
    builder.addCase(getPurchasesOfCustomer.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })

    builder.addCase(addPurchaseToCustomer.fulfilled, (state, action) => {
      console.log('addPurchaseToCustomer.fulfilled')
      state.purchases.push(action.payload)
      state.status = 'succeeded'
    })

    builder.addCase(deletePurchasesOfProduct.fulfilled, (state, action) => {
      state.purchases = state.purchases.filter(
        (purchase) => purchase.productId !== action.payload
      )
      state.status = 'succeeded'
    })

    builder.addCase(deletePurchasesOfCustomer.fulfilled, (state, action) => {
      state.purchases = state.purchases.filter(
        (purchase) => purchase.customerId !== action.payload
      )
      state.status = 'succeeded'
    })
  },
})

export const selectPurchases = (state) => state.purchases.purchases

export const selectPurchasesLoading = (state) =>
  state.purchases.status === 'loading'

export const selectPurchasesOfProduct = (state, productId) =>
  state.purchases.purchasesOfProduct[productId] || []

export const selectPurchasesOfCustomer = (state, customerId) =>
  state.purchases.purchasesOfCustomer[customerId] || []

export default purchasesSlice.reducer
