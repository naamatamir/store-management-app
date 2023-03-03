import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectProducts } from '../features/products/productsSlice'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

const ProductsComboBox = ({ onChange: setProductId }) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [showAll, setShowAll] = useState(true)

  const products = useSelector(selectProducts)

  const options = products.map((product) => ({
    label: product.name,
    value: product.id,
  }))

  return (
    <Autocomplete
      disablePortal
      id='products-combo-box'
      options={options}
      getOptionLabel={(option) => option.label}
      sx={{ width: 250 }}
      value={selectedOption}
      onChange={(event, newValue) => {
        setSelectedOption(newValue)
        setShowAll(false)
        if (setProductId) {
          setProductId(newValue.value)
        }
      }}
      renderInput={(params) => <TextField {...params} label='Select Product' />}
      isOptionEqualToValue={(option, value) => option.value === value.value}
    />
  )
}

export default ProductsComboBox