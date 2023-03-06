import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectProducts } from '../features/products/productsSlice'
import { useDispatch } from 'react-redux'
import {
  getPurchases,
  addPurchaseToCustomer,
} from '../features/purchases/purchasesThunks'
import { Autocomplete } from '@mui/material'
import TextField from '@mui/material/TextField'
import Button from './shared/Button'
import Toasts from './shared/Toasts'
import { showToast } from '../features/toasts/toastsSlice'

const AddProductForm = ({ customerId }) => {
  const products = useSelector(selectProducts)

  const [selectedProduct, setSelectedProduct] = useState(null)

  const handleProductSelect = (e, value) => {
    setSelectedProduct(value)
  }

  const dispatch = useDispatch()

  const productId = selectedProduct?.id

  const handleAddProduct = async (e) => {
    e.preventDefault()
    try {
      dispatch(addPurchaseToCustomer({ productId, customerId }))
      dispatch(
        showToast({ message: 'Product added to customer', type: 'success' })
      )
      setSelectedProduct(null)
      dispatch(getPurchases)
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    } catch (err) {
      dispatch(
        showToast({
          message: 'Failed to add product to customer',
          type: 'error',
        })
      )
    }
  }

  return (
    <>
      <form style={{ display: 'flex' }}>
        <Button style={{ flex: 1 }} type='submit' onClick={handleAddProduct}>
          Add
        </Button>
        <Autocomplete
          disablePortal
          id='product-select'
          options={products}
          getOptionLabel={(option) => option.name}
          sx={{ width: 250 }}
          value={selectedProduct}
          onChange={handleProductSelect}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField {...params} label='Select Product' />
          )}
        />
      </form>
      <Toasts />
    </>
  )
}

export default AddProductForm
