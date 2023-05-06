import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import {
  updateProduct,
  deleteProduct,
} from '../features/products/productsThunks'
import { deletePurchasesOfProduct } from '../features/purchases/purchasesThunks'
import { showToast } from '../features/toasts/toastsSlice'
import Toasts from './shared/Toasts'
import Box from '@mui/material/Box'
import TextField from './shared/TextField'
import Button from './shared/Button'
import SharedList from './shared/SharedList'

const ProductForm = ({ product, purchasesOfProduct }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { id } = useParams()

  const [productData, setProductData] = useState({
    // id: '',
    name: '',
    price: '',
    quantity: '',
  })

  useEffect(() => {
    if (product) {
      setProductData({
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      })
    }
  }, [product])

  const handleChange = ({ target: { name, value } }) => {
    setProductData({
      ...product,
      [name]: value,
    })
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    dispatch(updateProduct({ id, productData }))
    dispatch(showToast({ message: 'Product updated', type: 'update' }))
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      dispatch(deletePurchasesOfProduct(id))
      dispatch(deleteProduct({ id }))
      navigate && navigate('/products')
      dispatch(showToast({ message: 'Product deleted', type: 'delete' }))
    } catch (error) {
      console.error(error)
    }
  }

  const handleCustomerClick = (e, customer) => {
    e.preventDefault()
    navigate(`/customers/${customer.id}/edit`, { state: { customer } })
  }

  return (
    <>
      <Box
        component='form'
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: '10px',
          '& > :not(style)': { m: 1, width: '25ch' },
          '@media (max-width: 768px)': {
            flexDirection: 'column',
            alignItems: 'center',
          },
        }}
        noValidate
        autoComplete='off'>
        <TextField
          label='Product Name'
          name='name'
          value={productData.name}
          onChange={handleChange}
        />
        <TextField
          label='Price'
          name='price'
          value={productData.price}
          onChange={handleChange}
        />
        <TextField
          label='Quantity'
          name='quantity'
          value={productData.quantity}
          onChange={handleChange}
        />
      </Box>
      <Box
        component='form'
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          '& > :not(style)': { mt: 1, mb: 1, mr: 1.5, ml: 1.5, width: '25ch' },
          '@media (max-width: 768px)': {
            flexDirection: 'column',
            alignItems: 'center',
          },
        }}>
        <Button size='large' onClick={handleUpdate}>
          Update
        </Button>
        <Button color='error' size='large' onClick={handleDelete}>
          Delete
        </Button>
      </Box>
      <br />
      <SharedList
        data={purchasesOfProduct}
        headerText='Purchased by'
        handleItemClick={handleCustomerClick}
        context='customer'
      />
      <br />
      <Toasts navigate={navigate} path='/products' />
    </>
  )
}

export default ProductForm
