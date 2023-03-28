import { useSelector } from 'react-redux'
import { selectProducts } from '../productsSlice'
import ProductCard from '../../../components/productCard/ProductCard'
import './productsListStyles.css'

export const ProductsList = () => {
  const products = useSelector(selectProducts)

  return (
    <div className='product-container'>
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />
      })}
    </div>
  )
}
