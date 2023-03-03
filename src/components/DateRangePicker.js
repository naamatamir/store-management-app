import { useState } from 'react'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const DateRangePicker = ({ onChange: setDateRangeId }) => {
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ])

  const handleSelectedDates = (range) => {
    if (range.selection.length === 1) {
      setDates([range.selection])
      setDateRangeId(range.selection)
    } else {
      setDates([range.selection])
    }
  }

  return (
    <>
      {/* <p>Select Dates</p> */}
      <DateRange
        editableDateInputs={true}
        onChange={handleSelectedDates}
        moveRangeOnFirstSelection={false}
        ranges={dates}
      />
    </>
  )
}

export default DateRangePicker
