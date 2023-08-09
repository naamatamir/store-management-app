import { useSelector } from 'react-redux'
import { selectProductsLoading } from '../features/products/productsSlice'
import LoadingSpinner from '../components/shared/LoadingSpinner'

const WithSpinnerOnLoad = (WrappedComponent) => {
  const WithSpinnerOnLoad = (props) => {
    const isProductsLoading = useSelector(selectProductsLoading)

    return isProductsLoading
      ? (
      <LoadingSpinner />
    ) : (
      <WrappedComponent {...props} />
    )
  }

  return WithSpinnerOnLoad
}

export default WithSpinnerOnLoad
