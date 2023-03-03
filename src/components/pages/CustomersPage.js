import { useSelector } from 'react-redux'
import { selectCustomers } from '../../features/customers/customersSlice'
import NavBar from '../shared/NavBar'
import PageHeader from '../shared/PageHeader'
import CustomersTable from '../CustomersTable'
import CustomersTableRow from '../CustomersTableRow'

const CustomersPage = () => {
  // const customers = useSelector(selectCustomers)
  // const customerRows = customers.map((customer) => (
  //   <CustomersTableRow key={customer.id} customer={customer} />
  // ))
  return (
    <div
      className='customers-page-wrapper'
      style={{ backgroundColor: '#f5f5f5' }}>
      <NavBar />
      <PageHeader title='CUSTOMERS LIST ' />
      <CustomersTable  />
    </div>
  )
}

export default CustomersPage
