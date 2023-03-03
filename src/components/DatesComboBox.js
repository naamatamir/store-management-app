import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectPurchases } from '../features/purchases/purchasesSlice'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

const PurchasesComboBox = () => {
  const [selectedOption, setSelectedOption] = useState(null)

  const purchases = useSelector(selectPurchases)
  const options = purchases.map((purchase) => ({
    label: purchase.date,
    value: purchase.id,
  }))

  const [showAll, setShowAll] = useState(true)

  return (
    <Autocomplete
      disablePortal
      id='purchases-combo-box'
      options={options}
      getOptionLabel={(option) => option.label}
      sx={{ width: 250 }}
      value={selectedOption}
      onChange={(event, newValue) => {
        setSelectedOption(newValue)
        setShowAll(false)
      }}
      renderInput={(params) => <TextField {...params} label='Select Purchase' />}
      isOptionEqualToValue={(option, value) => option.value === value.value}
    />
  )
}

export default PurchasesComboBox
