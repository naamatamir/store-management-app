import { useSelector } from 'react-redux'
import { selectPurchases } from '../../features/purchases/purchasesSlice'
import NavBar from '../../components/shared/NavBar'
import { ProductsList } from '../../features/products/productsList/ProductsList'
import PageHeader from '../../components/shared/PageHeader'
import Typography from '@mui/material/Typography'
import './productsPageStyles.css'

const ProductsPage = () => {
  const purchases = useSelector(selectPurchases)
  const numOfProductsSold = purchases.length

  return (
    <div
      className='products-page-wrapper'
      style={{ backgroundColor: '#f5f5f5' }}>
      <NavBar />
      <br />
      <div className='purchases-counter-wrapper'>
        <Typography variant='h3' className='purchases-counter-typography'>
          <span>{numOfProductsSold}</span> PRODUCTS SOLD
        </Typography>
      </div>
      <PageHeader title='PRODUCTS INVENTORY' />
      <ProductsList />
    </div>
  )
}

export default ProductsPage
