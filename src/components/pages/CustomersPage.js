import NavBar from '../shared/NavBar'
import PageHeader from '../shared/PageHeader'
import CustomersTable from '../CustomersTable'
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
