import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectPurchases } from '../../features/purchases/purchasesSlice'
import { selectProducts } from '../../features/products/productsSlice'
import { selectCustomers } from '../../features/customers/customersSlice'
import NavBar from '../../components/shared/NavBar'
import PageHeader from '../../components/shared/PageHeader'
import Button from '../../components/shared/Button'
import SearchIcon from '@mui/icons-material/Search'
import './purchasesStyles.css'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import DatePicker from '../../components/DatePicker'

const PurchasesPage = () => {
  const purchases = useSelector(selectPurchases)

  const products = useSelector(selectProducts)
  // const allProducts = { id: -1, name: 'All Products' }
  const productsWithAll = [{ id: -1, name: 'All Products' }, ...products]

  const customers = useSelector(selectCustomers)
  // const allCustomers = { id: -1, firstName: 'All', lastName: 'Customers' }
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

    // if (selectedDate instanceof Date) {
    //   const selectedDateStr = selectedDate.toLocaleDateString('en-GB')
    //   filteredPurchases = filteredPurchases.filter(
    //     (purchase) => purchase.date === selectedDateStr
    //   )
    //   console.log("🚀 ~ file: PurchasesPage.js:66 ~ filterPurchases ~ filteredPurchases:", filteredPurchases)
    // }

    if (selectedDate instanceof Date) {
      filteredPurchases = filteredPurchases.filter(
        (purchase) => new Date(purchase.date).toLocaleDateString('en-GB') === selectedDate.toLocaleDateString('en-GB')
      )
      console.log("🚀 ~ file: PurchasesPage.js:72 ~ filterPurchases ~ filteredPurchases:", filteredPurchases)
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
          <table className='purchases-table-wrapper'>
            <thead>
              <tr>
                <th>Product</th>
                <th>Customer</th>
                <th>Purchase Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredPurchases.map((purchase) => (
                <tr key={purchase.id}>
                  <td>{purchase.productName}</td>
                  <td>{purchase.customerName}</td>
                  <td>
                    {purchase.date &&
                      new Date(purchase.date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric',
                      })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

export default PurchasesPage
