import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  getProductsAPI,
  getProductByIdAPI,
  updateProductAPI,
  deleteProductAPI,
} from './productsAPI'

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async () => {
    const products = await getProductsAPI()
    return products
  }
)

export const getProductById = createAsyncThunk(
  'products/getProductById',
  async (id) => {
    const product = await getProductByIdAPI(id)
    return product
  }
)

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, productData }) => {
    const product = await updateProductAPI(id, productData)
    return product
  }
)

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id) => {
    await deleteProductAPI(id)
    return id
  }
)
