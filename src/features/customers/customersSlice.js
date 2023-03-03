import { createSlice } from '@reduxjs/toolkit'
import {
  getCustomers,
  // getCustomerById,
  updateCustomer,
  deleteCustomer,
} from './customersThunks'

const initialState = {
  customers: [],
  // currentCustomer: null,
  status: 'idle',
  error: null,
}

export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    // setCustomers: (state, action) => {
    //   state.customers = action.payload
    // },
    // setCurrentCustomer: (state, action) => {
    //   state.currentCustomer = action.payload
    // },
    //*?need- updateCurrentCustomer*/
  },
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

    // Fetch a single customer
    // builder.addCase(getCustomerById.pending, (state) => {
    //   state.status = 'loading'
    // })
    // builder.addCase(getCustomerById.fulfilled, (state, action) => {
    //   state.status = 'succeeded'
    //   state.currentCustomer = action.payload
    // })
    // builder.addCase(getCustomerById.rejected, (state, action) => {
    //   state.status = 'failed'
    //   state.error = action.error.message
    // })

    // Update customer
    builder.addCase(updateCustomer.fulfilled, (state, action) => {
      const customerIndex = state.customers.findIndex(
        (customer) => customer.id === action.payload.id
      )
      if (customerIndex !== -1) {
        state.customers[customerIndex] = action.payload
        //*?need instead */
        // state.currentCustomer = action.payload
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

// export const { setCustomers, setCurrentCustomer, updateCurrentCustomer } =
//   customersSlice.actions

export const selectCustomers = (state) => state.customers.customers

export const selectCustomersLoading = (state) =>
  state.customers.status === 'loading'

// export const selectCurrentCustomer = (state) => state.customers.currentCustomer

export default customersSlice.reducer
