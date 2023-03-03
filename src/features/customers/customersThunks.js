import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  getCustomersAPI,
  getCustomerByIdAPI,
  updateCustomerAPI,
  deleteCustomerAPI,
} from './customersAPI'

export const getCustomers = createAsyncThunk(
  'customers/getCustomers',
  async () => {
    const customers = await getCustomersAPI()
    return customers
  }
)

export const getCustomerById = createAsyncThunk(
  'customers/getCustomerById',
  async (id) => {
    const customer = await getCustomerByIdAPI(id)
    return customer
  }
)

export const updateCustomer = createAsyncThunk(
  'customers/updateCustomer',
  async ({ id, customerData }) => {
    const customer = await updateCustomerAPI(id, customerData)
    return customer
  }
)

export const deleteCustomer = createAsyncThunk(
  'customers/deleteCustomer',
  async (id) => {
    await deleteCustomerAPI(id)
    return id
  }
)
