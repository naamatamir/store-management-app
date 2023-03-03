import { useState, useEffect, useCallback, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCustomers } from '../features/customers/customersSlice'
import { selectPurchasesOfCustomer } from '../features/purchases/purchasesSlice'
import { getPurchasesOfCustomer } from '../features/purchases/purchasesThunks'
import { Link } from 'react-router-dom'
import AddProductForm from './AddProductForm'
import SharedTable from './shared/SharedTable'

// const purchasesOfCustomerSelector = (state, customerId) =>
//   selectPurchasesOfCustomer(state, customerId) || [];

const CustomersTable = ({ customers }) => {
    // const [customerPurchases, setCustomerPurchases] = useState({})

    const dispatch = useDispatch()
    
    useEffect(() => {
        customers.forEach((customer) => {
          dispatch(getPurchasesOfCustomer(customer.id));
        });
      }, [dispatch, customers]);
    
      const purchasesOfCustomerSelector = useCallback(
        (state, customerId) => selectPurchasesOfCustomer(state, customerId) || [],
        []
      );
    
      const customerPurchases = useMemo(() => {
        const purchasesByCustomer = {};
        customers.forEach((customer) => {
          const purchasesOfCustomer = purchasesOfCustomerSelector(customer.id);
          purchasesByCustomer[customer.id] = purchasesOfCustomer;
        });
        return purchasesByCustomer;
      }, [customers, purchasesOfCustomerSelector]);

    // const purchasesOfCustomer =
    // useSelector((state) => selectPurchasesOfCustomer(state, customer.id)) || []
    
  const headers = ['Name', 'Purchases', 'Dates']

  const data = customers.map((customer) => {
    return {
      property1: (
        <Link to={`/customers/${customer.id}/edit`}>
          {customer.firstName} {customer.lastName}
        </Link>
      ),
      property2: (
        <>
          <ul>
            {/* {customerPurchases.length > 0 ? (
              customerPurchases.map((product) => (
                <li key={product.id}>
                  <Link to={`/products/${product.id}/edit`}>{product}</Link>
                </li>
              ))
            ) : (
              <p>No purchases</p>
            )} */}
          </ul>
          {/* {selectedCustomerId === customer.id ? (
                <AddProductForm customerId={selectedCustomerId} />
              ) : (
                <Button onClick={() => showAddProductForm(customer.id)}>
                  Add Product
                </Button>
              )} */}
        </>
      ),
      property3: 'dates',
    }
  })

  return (
    <SharedTable
      headers={headers}
      data={data}
      // headerStyle={headerStyle}
    //   columnStyle={columnStyle}
    />
  )

}

export default CustomersTable
