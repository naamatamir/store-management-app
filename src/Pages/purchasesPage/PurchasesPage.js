import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectPurchases } from '../../features/purchases/purchasesSlice'
import { selectProducts } from '../../features/products/productsSlice'
import { selectCustomers } from '../../features/customers/customersSlice'
import NavBar from '../../components/shared/NavBar'
import PageHeader from '../../components/shared/PageHeader'
import Button from '../../components/shared/Button'
import SearchIcon from '@mui/icons-material/Search'
import './purchasesPageStyles.css'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import DatePicker from '../../components/DatePicker'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { styled } from '@mui/material/styles'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#f5f5f5',
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    fontSize: '1.1rem',
    maxWidth: '50px',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    maxWidth: '50px',
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const PurchasesPage = () => {
  const purchases = useSelector(selectPurchases)

  const products = useSelector(selectProducts)
  const productsWithAll = [{ id: -1, name: 'All Products' }, ...products]

  const customers = useSelector(selectCustomers)
  const customersWithAll = [
    { id: -1, firstName: 'All', lastName: 'Customers' },
    ...customers,
  ]

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [filteredPurchases, setFilteredPurchases] = useState([])

  const handleProductSelect = (event, value) => {
    setSelectedProduct(value)
  }

  const handleCustomerSelect = (event, value) => {
    setSelectedCustomer(value)
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
  }

  const filterPurchases = () => {
    let filteredPurchases = [...purchases]

    if (selectedProduct && selectedProduct.id !== -1) {
      filteredPurchases = filteredPurchases.filter(
        (purchase) => purchase.productId === selectedProduct.id
      )
    }

    if (selectedCustomer && selectedCustomer.id !== -1) {
      filteredPurchases = filteredPurchases.filter(
        (purchase) => purchase.customerId === selectedCustomer.id
      )
    }

    if (selectedDate instanceof Date) {
      filteredPurchases = filteredPurchases.filter(
        (purchase) =>
          new Date(purchase.date).toLocaleDateString('en-GB') ===
          selectedDate.toLocaleDateString('en-GB')
      )
      console.log(
        '🚀 ~ file: PurchasesPage.js:72 ~ filterPurchases ~ filteredPurchases:',
        filteredPurchases
      )
    }

    return filteredPurchases.map((purchase) => {
      const product = products.find(
        (product) => product.id === purchase.productId
      )
      const customer = customers.find(
        (customer) => customer.id === purchase.customerId
      )

      return {
        ...purchase,
        productName: product ? product.name : 'Unknown Product',
        customerName: customer
          ? `${customer.firstName} ${customer.lastName}`
          : 'Unknown Customer',
      }
    })
  }

  const handleSearch = () => {
    const filteredPurchases = filterPurchases()
    setFilteredPurchases(filteredPurchases)
  }

  return (
    <>
      <NavBar />
      <PageHeader title='SEARCH PURCHASES' />
      <div className='search-wrapper'>
        <Autocomplete
          disablePortal
          id='product-select'
          options={productsWithAll}
          getOptionLabel={(option) => option.name}
          sx={{ width: 250 }}
          value={selectedProduct}
          onChange={handleProductSelect}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField {...params} label='Select Product' />
          )}
        />
        <br />
        <Autocomplete
          disablePortal
          id='customer-select'
          options={customersWithAll}
          getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
          sx={{ width: 250 }}
          value={selectedCustomer}
          onChange={handleCustomerSelect}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField {...params} label='Select Customer' />
          )}
        />
        <br />
        <DatePicker handleDateSelect={handleDateSelect} />
        <br />
        <Button startIcon={<SearchIcon />} onClick={handleSearch}>
          Search
        </Button>
        <br />

        {filteredPurchases.length > 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label='customized table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell align='center'>Product</StyledTableCell>
                  <StyledTableCell align='center'>Customer</StyledTableCell>
                  <StyledTableCell align='center'>
                    Purchase Date
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPurchases.map((purchase) => (
                  <StyledTableRow key={purchase.id}>
                    <StyledTableCell>{purchase.productName}</StyledTableCell>
                    <StyledTableCell>{purchase.customerName}</StyledTableCell>
                    <StyledTableCell>
                      {purchase.date &&
                        new Date(purchase.date).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'numeric',
                          year: 'numeric',
                        })}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </>
  )
}

export default PurchasesPage
