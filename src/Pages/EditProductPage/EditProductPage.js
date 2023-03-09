import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useLocation } from 'react-router-dom'
import { getPurchasesOfProduct } from '../../features/purchases/purchasesThunks'
import { selectPurchasesOfProduct } from '../../features/purchases/purchasesSlice'
import NavBar from '../../components/shared/NavBar'
import ProductForm from '../../components/ProductForm'
import PageHeader from '../../components/shared/PageHeader'

const EditProductPage = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const location = useLocation()
  const { product } = location.state || {}
  // console.log(location.state?.product);

  useEffect(() => {
    dispatch(getPurchasesOfProduct(id))
  }, [dispatch, id])

  const purchasesOfProduct =
    useSelector((state) => selectPurchasesOfProduct(state, id)) || []

  return (
    <>
      <NavBar />
      <PageHeader title='PRODUCT PAGE' />
      <div className='edit-form-wrapper' style={{ backgroundColor: 'white' }}>
        <ProductForm
          product={product}
          purchasesOfProduct={purchasesOfProduct}
        />
      </div>
    </>
  )
}

export default EditProductPage
