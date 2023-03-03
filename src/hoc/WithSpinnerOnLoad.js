import { useSelector } from 'react-redux'
import { selectProductsLoading } from '../features/products/productsSlice'
// import { selectCustomersLoading } from '../features/customers/customersSlice'
// import { selectPurchasesLoading } from '../features/purchases/purchasesSlice'
import LoadingSpinner from '../components/shared/LoadingSpinner'

const WithSpinnerOnLoad = (WrappedComponent) => {
  const WithSpinnerOnLoad = (props) => {
    const isProductsLoading = useSelector(selectProductsLoading)
    // const isCustomersLoading = useSelector(selectCustomersLoading)
    // const isPurchasesLoading = useSelector(selectPurchasesLoading)

    return isProductsLoading
      // ||  isPurchasesLoading || isCustomersLoading 
      ? (
      <LoadingSpinner />
    ) : (
      <WrappedComponent {...props} />
    )
  }

  return WithSpinnerOnLoad
}

export default WithSpinnerOnLoad
