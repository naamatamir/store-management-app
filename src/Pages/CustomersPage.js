import NavBar from '../components/shared/NavBar'
import PageHeader from '../components/shared/PageHeader'
import CustomersTable from '../components/shared/customersTable/CustomersTable'
const CustomersPage = () => {
  return (
    <div
      className='customers-page-wrapper'
      style={{ backgroundColor: '#f5f5f5' }}>
      <NavBar />
      <PageHeader title='CUSTOMERS LIST ' />
      <CustomersTable />
    </div>
  )
}

export default CustomersPage
