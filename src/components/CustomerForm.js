import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  updateCustomer,
  deleteCustomer,
} from '../features/customers/customersThunks'
import { deletePurchasesOfCustomer } from '../features/purchases/purchasesThunks'
import { showToast } from '../features/toasts/toastsSlice'
import Toasts from './shared/Toasts'
import Box from '@mui/material/Box'
import TextField from './shared/TextField'
import Button from './shared/Button'
import Typography from '@mui/material/Typography'

const CustomerForm = ({ customer, purchasesOfCustomer }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { id } = useParams()

  const [customerData, setCustomerData] = useState({
    // id: '',
    firstName: '',
    lastName: '',
    city: '',
  })

  useEffect(() => {
    if (customer) {
      setCustomerData({
        firstName: customer.firstName,
        lastName: customer.lastName,
        city: customer.city,
      })
    }
  }, [customer])

  const handleChange = ({ target: { name, value } }) => {
    setCustomerData({
      ...customer,
      [name]: value,
    })
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    dispatch(updateCustomer({ id, customerData }))
    dispatch(showToast({ message: 'Customer updated', type: 'update' }))
  }

  const handleDelete = (e) => {
    e.preventDefault()
    try {
      dispatch(deletePurchasesOfCustomer(id))
      dispatch(deleteCustomer({ id }))
      navigate && navigate('/customers')
      dispatch(showToast({ message: 'Customer deleted', type: 'delete' }))
    } catch (error) {
      console.error(error)
    }
  }

  const handleProductClick = (e, product) => {
    e.preventDefault()
    navigate(`/products/${product.id}/edit`, { state: { product } })
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
          label='First Name'
          name='firstName'
          value={customerData.firstName}
          onChange={handleChange}
        />
        <TextField
          label='Last Name'
          name='lastName'
          value={customerData.lastName}
          onChange={handleChange}
        />
        <TextField
          label='City'
          name='city'
          value={customerData.city}
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
        <Button size='large' onClick={handleUpdate}>Update</Button>
        <Button color='error' size='large' onClick={handleDelete}>
          Delete
        </Button>
      </Box>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '0 auto',
        }}>
        <Typography variant='h5'>Products Purchased:</Typography>
        <ul>
          {purchasesOfCustomer ? (
            purchasesOfCustomer.map((product) => (
              <li key={product.id}>
                <Link to='#' onClick={(e) => handleProductClick(e, product)}>
                  {product.name}
                </Link>
              </li>
            ))
          ) : (
            <p>No customers found</p>
          )}
        </ul>
      </div>
      <Toasts navigate={navigate} path='/customers' />
    </>
  )
}

export default CustomerForm


