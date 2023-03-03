import { useState } from 'react'
import { useDispatch } from 'react-redux'
import  ProductsComboBox  from './ProductsComboBox'
import { addPurchaseToCustomer } from '../features/purchases/purchasesThunks'
import Button from './shared/Button'

const AddProductForm = ({ customerId }) => {
  const [selectedOption, setSelectedOption] = useState(null)

  const dispatch = useDispatch()
  const productId = selectedOption?.value
  console.log("🚀 ~ file: AddProductForm.js:12 ~ AddProductForm ~ productId:", productId)
  
  // const handleSubmit = (e) => {
  //   console.log('handleSubmit function called')
  //   e.preventDefault()
  //   console.log('product added from AddProductForm')
  //   dispatch(addPurchaseToCustomer({ productId, customerId })).then(
  //     (action) => {
  //       console.log('Action dispatched:', action)
  //       console.log('After dispatch')
  //     }
  //   )
  // }

  const handleSubmit = async (e) => {
    console.log('handleSubmit function called')
    e.preventDefault()
    console.log('product added from AddProductForm')
    try {
      const action = dispatch(addPurchaseToCustomer({ productId, customerId }))
      console.log('Action dispatched:', action)
      console.log('After dispatch')
    } catch (err) {
      console.error('Error dispatching addPurchaseToCustomer:', err)
    }
  }
  

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
      <Button style={{ flex: 1 }} type='submit'>
        Add
      </Button>
      <ProductsComboBox
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        style={{ flex: 1 }}
        // onChange={setProductId}
      />
    </form>
  )
}

export default AddProductForm


  // const handleSelectChange = (option) => {
  //   console.log("🚀 ~ file: AddProductForm.js:14 ~ handleSelectChange ~ option:", option)
  //   setSelectedOption(option)
  // }