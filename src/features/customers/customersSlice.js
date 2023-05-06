import { createSlice } from '@reduxjs/toolkit'
import { getCustomers, updateCustomer, deleteCustomer } from './customersThunks'

const initialState = {
  customers: [],
  status: 'idle',
  error: null,
}

export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all customers
    builder.addCase(getCustomers.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(getCustomers.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.customers = action.payload
    })
    builder.addCase(getCustomers.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
    // Update customer
    builder.addCase(updateCustomer.fulfilled, (state, action) => {
      const customerIndex = state.customers.findIndex(
        (customer) => customer.id === action.payload.id
      )
      if (customerIndex !== -1) {
        state.customers[customerIndex] = action.payload
      }
      state.status = 'succeeded'
    })
    // Delete customer
    builder.addCase(deleteCustomer.fulfilled, (state, action) => {
      state.customers = state.customers.filter(
        (customer) => customer.id !== action.payload
      )
      state.status = 'succeeded'
    })
  },
})

export const selectCustomers = (state) => state.customers.customers

export const selectCustomersLoading = (state) =>
  state.customers.status === 'loading'

export default customersSlice.reducer
