import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectPurchases } from '../../../features/purchases/purchasesSlice';
import { selectProducts } from '../../../features/products/productsSlice';
import { selectCustomers } from '../../../features/customers/customersSlice';
import Button from '../../shared/Button';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function PurchaseList() {
  const purchases = useSelector(selectPurchases);
  const products = useSelector(selectProducts);
  const allProducts = { id: -1, name: 'All Products' };
  const productsWithAll = [{ id: -1, name: 'All Products' }, ...products];
  
  const customers = useSelector(selectCustomers);
const allCustomers = { id: -1, firstName: 'All', lastName: 'Customers' };
const customersWithAll = [{ id: -1, firstName: 'All', lastName: 'Customers' }, ...customers];


  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [filteredPurchases, setFilteredPurchases] = useState([]);

  const handleProductSelect = (event, value) => {
    setSelectedProduct(value);
  };

  const handleCustomerSelect = (event, value) => {
    setSelectedCustomer(value);
  };

  const handleDateRangeSelect = (range) => {
    setSelectedDateRange(range.selection);
  };

  const filterPurchases = () => {
    let filteredPurchases = [...purchases];
  
    if (selectedProduct && selectedProduct.id !== -1) {
      filteredPurchases = filteredPurchases.filter(
        (purchase) => purchase.productId === selectedProduct.id
      );
    }
  
    if (selectedCustomer && selectedCustomer.id !== -1) {
      filteredPurchases = filteredPurchases.filter(
        (purchase) => purchase.customerId === selectedCustomer.id
      );
    }
  
    if (
      selectedDateRange &&
      selectedDateRange.startDate &&
      selectedDateRange.endDate
    ) {
      filteredPurchases = filteredPurchases.filter(
        (purchase) =>
          new Date(purchase.date) >= selectedDateRange.startDate &&
          new Date(purchase.date) <= selectedDateRange.endDate
      );
    }
  
    return filteredPurchases.map((purchase) => {
      const product = products.find(
        (product) => product.id === purchase.productId
      );
      const customer = customers.find(
        (customer) => customer.id === purchase.customerId
      );
  
      return {
        ...purchase,
        productName: product ? product.name : 'Unknown Product',
        customerName: customer
          ? `${customer.firstName} ${customer.lastName}`
          : 'Unknown Customer',
      };
    });
  };
  

  const handleSearch = () => {
    const filteredPurchases = filterPurchases();
    setFilteredPurchases(filteredPurchases);
  };



  return (
    <>
      <div>
        <Autocomplete
          disablePortal
          id="product-select"
          options={productsWithAll}
          getOptionLabel={(option) => option.name}
          value={selectedProduct}
          onChange={handleProductSelect}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField {...params} label="Select Product" />
          )}
        />
      </div>
      <div>
        <Autocomplete
          disablePortal
          id="customer-select"
          options={customersWithAll}
          getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
          value={selectedCustomer}
          onChange={handleCustomerSelect}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField {...params} label="Select Customer" />
          )}
        />
      </div>
      <div>
        <br />
        <Button startIcon={<SearchIcon />} onClick={handleSearch}>
          Search
        </Button
>
        <br />
      </div>
      <div>
        <table>
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
      </div>
    </>
  )
}

export default PurchaseList
