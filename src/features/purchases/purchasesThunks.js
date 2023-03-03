import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  getPurchasesAPI,
  getPurchasesByProductIdAPI,
  getPurchasesByCustomerIdAPI,
  getPurchasesOfProductAPI,
  getPurchasesOfCustomerAPI,
  addPurchaseToCustomerAPI,
  deletePurchasesOfProductAPI,
  deletePurchasesOfCustomerAPI,
} from './purchasesAPI'

export const getPurchases = createAsyncThunk(
  'purchases/getPurchases',
  async () => {
    const purchases = await getPurchasesAPI()
    return purchases
  }
)

export const getPurchasesOfProduct = createAsyncThunk(
  'purchases/getPurchasesOfProduct',
  async (productId) => {
    const purchases = await getPurchasesOfProductAPI(productId)
    return purchases
  }
)

export const getPurchasesOfCustomer = createAsyncThunk(
  'purchases/getPurchasesOfCustomer',
  async (customerId) => {
    const purchases = await getPurchasesOfCustomerAPI(customerId)
    return purchases
  }
)

export const addPurchaseToCustomer = createAsyncThunk(
  'purchases/addPurchaseToCustomer',
  async ({ productId, customerId }) => {
    console.log('addPurchaseToCustomer called with', { productId, customerId })
    try {
      await addPurchaseToCustomerAPI(productId, customerId)
    } catch (err) {
      console.error(
        `Error adding product ${productId} to customer ${customerId}`,
        err
      )
      throw err
    }
  }
)

export const deletePurchasesOfProduct = createAsyncThunk(
  'purchases/deletePurchasesOfProduct',
  async (productId) => {
    await deletePurchasesOfProductAPI(productId)
  }
)

export const deletePurchasesOfCustomer = createAsyncThunk(
  'purchases/deletePurchasesOfCustomer',
  async (customerId) => {
    await deletePurchasesOfCustomerAPI(customerId)
  }
)


// export const getPurchasesByProductId = createAsyncThunk(
//   'purchases/getPurchasesByProductId',
//   async (id) => {
//     const purchase = await getPurchasesByProductIdAPI(id)
//     return purchase
//   }
// )

// export const getPurchasesByCustomerId = createAsyncThunk(
//   'purchases/getPurchasesByCustomerId',
//   async (id) => {
//     const purchase = await getPurchasesByCustomerIdAPI(id)
//     return purchase
//   }
// )