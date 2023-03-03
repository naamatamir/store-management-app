import { useSelector } from 'react-redux'
import { selectProducts } from './productsSlice'
import ProductCard from '../../components/productCard/ProductCard'

export const ProductsList = () => {
  const products = useSelector(selectProducts)

  return (
    <>
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />
      })}
    </>
  )
}
