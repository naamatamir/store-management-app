import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectPurchasesOfCustomer } from '../../../features/purchases/purchasesSlice'
import { getPurchasesOfCustomer } from '../../../features/purchases/purchasesThunks'
import { Link } from 'react-router-dom'
import AddProductForm from '../AddProductForm'
import Button from '../Button'
import { styled } from '@mui/material/styles'
import TableRow from '@mui/material/TableRow'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    minWidth: '100px',
    maxWidth: '260px',
    padding: '0',
    paddingLeft: '16px',
  },
}))

const CustomersTableRow = ({ customer }) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState(null)

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
  }

  return (
    <StyledTableRow>
      <StyledTableCell>
        <Link to='#' onClick={(e) => handleCustomerClick(e, customer)}>
          {customer.firstName} {customer.lastName}
        </Link>
      </StyledTableCell>
      <StyledTableCell>
        {purchasesOfCustomer.length > 0 ? (
          <ul style={{ padding: '0' }}>
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
      </StyledTableCell>
      <StyledTableCell>
        {purchasesOfCustomer.length > 0 ? (
          <ul style={{ padding: '0' }}>
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
      </StyledTableCell>
      <StyledTableCell>
        {selectedCustomerId === customer.id ? (
          <AddProductForm customerId={selectedCustomerId} />
        ) : (
          <Button onClick={() => showAddProductForm(customer.id)}>Add</Button>
        )}
      </StyledTableCell>
    </StyledTableRow>
  )
}

export default CustomersTableRow
