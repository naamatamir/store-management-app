import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { selectPurchases } from '../../features/purchases/purchasesSlice'
import { selectPurchasesOfProduct } from '../../features/purchases/purchasesSlice'
import { getPurchasesOfProduct } from '../../features/purchases/purchasesThunks'
import Card from '../shared/Card'
import Button from '../shared/Button'
import AddProductForm from '../AddProductForm'
import Toasts from '../shared/Toasts'
import './productCard.styles.css'

const ProductCard = ({ product }) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState(null)
  const [openFormId, setOpenFormId] = useState(null)

  const dispatch = useDispatch()

  // const purchases = useSelector(selectPurchases)

  const purchasesOfProduct =
    useSelector((state) => selectPurchasesOfProduct(state, product.id)) || []

  useEffect(() => {
    dispatch(getPurchasesOfProduct(product.id))
  }, [dispatch, product.id])

  const showAddProductForm = (customerId) => {
    setSelectedCustomerId(customerId)
    setOpenFormId(customerId)
  }

  return (
    <>
      {' '}
      <Card
        className='product-card-wrapper'
        link={{
          pathname: `/products/${product.id}/edit`,
          state: { product },
        }}
        variant='h5'
        title={product.name}
        label1='Price: '
        value1={`$${product.price}`}
        label2='Quantity: '
        value2={product.quantity}
        //**better as a separate CustomerCard comp? as outlet?*/
        children={
          purchasesOfProduct.length === 0 ? (
            <p>No purchases found for this product</p>
          ) : (
            purchasesOfProduct.map((customer) => (
              <Card
                key={customer.id}
                className='customer-card-wrapper'
                style={{
                  textAlign: 'left',
                  backgroundColor: '#f5f5f5',
                  // border: '1px solid grey',
                  paddingTop: '0.5rem',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.26)',
                  transition: 'all 0.3s ease-in-out',
                }}
                link={{
                  pathname: `/customers/${customer.id}/edit`,
                  state: { customer },
                }}
                variant='h6'
                title={`${customer.firstName} ${customer.lastName}`}
                label1='Purchase Date: '
                value1={
                  customer.date &&
                  new Date(customer.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                  })
                }
                children={
                  <>
                    {selectedCustomerId !== customer.id && (
                      <Button onClick={() => showAddProductForm(customer.id)}>
                        Add Product
                      </Button>
                    )}
                    {selectedCustomerId === customer.id &&
                      openFormId === customer.id && (
                        <AddProductForm customerId={selectedCustomerId} />
                      )}
                  </>
                }
              />
            ))
          )
        }
      />
      <Toasts />
    </>
  )
}

export default ProductCard
