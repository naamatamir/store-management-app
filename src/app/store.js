import { configureStore } from '@reduxjs/toolkit'
import productsSlice from '../features/products/productsSlice'
import customersSlice from '../features/customers/customersSlice'
import purchasesSlice from '../features/purchases/purchasesSlice'
import toastsSlice from '../features/toasts/toastsSlice'

export const store = configureStore({
  reducer: {
    products: productsSlice,
    customers: customersSlice,
    purchases: purchasesSlice,
    toasts: toastsSlice,
  },
})
