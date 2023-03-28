import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { useMediaQuery } from '@mui/material'
import dayjs from 'dayjs'
import 'dayjs/locale/en-gb'

const DatePicker = ({handleDateSelect}) => {
  const [value, setValue] = useState(null)
  const isMobile = useMediaQuery('(max-width:600px)')

  dayjs.locale('en-gb')

  const datePicker = isMobile ? (
    <MobileDatePicker 
      label='Select Date'
      value={value}
      onChange={(newValue) => {
        setValue(newValue)
        handleDateSelect(newValue)
      }}
      clearable
      renderInput={(params) => (
        <TextField
          {...params}
          style={{width: 250}}
          value={
            value instanceof Date
              ? value.toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'numeric',
                  year: 'numeric',
                })
              : ''
          }
        />
      )}
    />
  ) : (
    <DesktopDatePicker
      label='Select Date'
      inputFormat='DD/MM/YYYY'
      value={value}
      onChange={(newValue) => {
        setValue(newValue)
        handleDateSelect(newValue)
      }}
      clearable
      renderInput={(params) => (
        <TextField
          {...params}
          style={{width: 250}}
          value={
            value instanceof Date
              ? value.toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'numeric',
                  year: 'numeric',
                })
              : ''
          }
        />
      )}
    />
  )

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>{datePicker}</Stack>
    </LocalizationProvider>
  )
}

export default DatePicker
