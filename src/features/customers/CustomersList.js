import { useSelector } from 'react-redux'
import { selectCustomers } from './customersSlice'
import { CustomerCard } from '../../components/CustomerCard'

export const CustomersList = () => {
  const customers = useSelector(selectCustomers)

  return (
    <>
      <h2>Customers List</h2>{' '}
      <div className='customers-list-container'>
        {customers.map((customer) => {
          return <CustomerCard key={customer.id} customer={customer} />
        })}
      </div>
    </>
  )
}
