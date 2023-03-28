import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectPurchasesOfCustomer } from '../features/purchases/purchasesSlice'
import { getPurchasesOfCustomer } from '../features/purchases/purchasesThunks'
import { Link } from 'react-router-dom'
import AddProductForm from './shared/addProductForm/AddProductForm'
import Button from './shared/Button'
import { styled } from '@mui/material/styles'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const CustomersTableRow = ({ customer }) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState(null)
  // const [openFormId, setOpenFormId] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const purchasesOfCustomer =
    useSelector((state) => selectPurchasesOfCustomer(state, customer.id)) || []

  useEffect(() => {
    dispatch(getPurchasesOfCustomer(customer.id))
  }, [dispatch, customer.id])

  const handleCustomerClick = (e, customer) => {
    e.preventDefault()
    navigate(`/customers/${customer.id}/edit`, { state: { customer } })
  }

  const handleProductClick = (e, product) => {
    e.preventDefault()
    navigate(`/products/${product.id}/edit`, { state: { product } })
  }

  const showAddProductForm = (customerId) => {
    setSelectedCustomerId(customerId)
    // setOpenFormId(customerId)
  }

  return (
    <StyledTableRow>
      <TableCell>
        <Link to='#' onClick={(e) => handleCustomerClick(e, customer)}>
          {customer.firstName} {customer.lastName}
        </Link>
      </TableCell>
      <TableCell>
        {purchasesOfCustomer.length > 0 ? (
          <ul>
            {purchasesOfCustomer.map((product) => (
              <li key={product.id}>
                <Link to='#' onClick={(e) => handleProductClick(e, product)}>
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No purchases</p>
        )}
      </TableCell>
      <TableCell>
        {purchasesOfCustomer.length > 0 ? (
          <ul>
            {purchasesOfCustomer.map((product) => (
              <li key={product.id}>
                {product.date &&
                  new Date(product.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                  })}
              </li>
            ))}
          </ul>
        ) : (
          <p>No purchases</p>
        )}
      </TableCell>
      <TableCell>
        {selectedCustomerId === customer.id ? (
          <AddProductForm customerId={selectedCustomerId} />
        ) : (
          <Button onClick={() => showAddProductForm(customer.id)}>
            Add Product
          </Button>
        )}
      </TableCell>
    </StyledTableRow>
  )
}

export default CustomersTableRow
