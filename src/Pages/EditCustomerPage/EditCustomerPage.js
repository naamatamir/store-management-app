import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useLocation } from 'react-router-dom'
import { getPurchasesOfCustomer } from '../../features/purchases/purchasesThunks'
import { selectPurchasesOfCustomer } from '../../features/purchases/purchasesSlice'
import NavBar from '../../components/shared/NavBar'
import CustomerForm from '../../components/CustomerForm'
import PageHeader from '../../components/shared/PageHeader'
import './EditCustomerPageStyles.css'

const EditCustomerPage = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const location = useLocation()
  const { customer } = location.state || {}
  // console.log(location.state?.customer)

  useEffect(() => {
    dispatch(getPurchasesOfCustomer(id))
  }, [dispatch, id])

  const purchasesOfCustomer =
    useSelector((state) => selectPurchasesOfCustomer(state, id)) || []

  return (
    <>
      <NavBar />
      <PageHeader title='CUSTOMER PAGE' />
      <div className='edit-form-wrapper' style={{ backgroundColor: 'white' }}>
      <CustomerForm
        customer={customer}
        purchasesOfCustomer={purchasesOfCustomer}
      />
      </div>
    </>
  )
}

export default EditCustomerPage
