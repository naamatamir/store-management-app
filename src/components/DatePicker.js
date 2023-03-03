import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { useMediaQuery } from '@mui/material'

const DatePicker = () => {
  const [value, setValue] = useState(null)
  const isMobile = useMediaQuery('(max-width:600px)')

  const datePicker = isMobile ? (
    <MobileDatePicker
      label='Select Date'
      value={value}
      onChange={(newValue) => {
        setValue(newValue)
      }}
      clearable
      renderInput={(params) => (
        <TextField
          {...params}
          value={value ? value.format('MM-DD-YYYY') : ''}
        />
      )}
    />
  ) : (
    <DesktopDatePicker
      label='Select Date'
      value={value}
      onChange={(newValue) => {
        setValue(newValue)
      }}
      clearable
      renderInput={(params) => {
        const { InputProps, ...rest } = params
        return <TextField {...params} />
      }}
    />
  )

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>{datePicker}</Stack>
    </LocalizationProvider>
  )
}

export default DatePicker
