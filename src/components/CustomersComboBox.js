import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCustomers } from '../features/customers/customersSlice'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

const CustomersComboBox = ({onChange: setCustomerId}) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [showAll, setShowAll] = useState(true)

  const customers = useSelector(selectCustomers)

  const options = customers.map((customer) => ({
    label: `${customer.firstName} ${customer.lastName}`,
    value: customer.id,
  }))

  return (
    <Autocomplete
      disablePortal
      id='customers-combo-box'
      options={options}
      getOptionLabel={(option) => option.label}
      sx={{ width: 250 }}
      value={selectedOption}
      onChange={(event, newValue) => {
        setSelectedOption(newValue)
        setShowAll(false)
        setCustomerId(newValue.value) 

      }}
      renderInput={(params) => (
        <TextField {...params} label='Select Customer' />
      )}
      isOptionEqualToValue={(option, value) => option.value === value.value}
    />
  )
}

export default CustomersComboBox
