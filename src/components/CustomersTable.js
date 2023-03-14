import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import CustomersTableRow from './CustomersTableRow'
import { selectCustomers } from '../features/customers/customersSlice'
import { useSelector } from 'react-redux'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'white',
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    fontSize: '1.1rem',
    maxWidth: '50px',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    maxWidth: '50px',
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const CustomersTable = () => {
  const customers = useSelector(selectCustomers)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>Full Name</StyledTableCell>
            <StyledTableCell align='center'>Purchases</StyledTableCell>
            <StyledTableCell align='center'>Dates</StyledTableCell>
            <StyledTableCell align='center'>Add Product</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <CustomersTableRow key={customer.id} customer={customer} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CustomersTable

{
  /* <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component='th' scope='row'>
                {row.name}
              </StyledTableCell>
              <StyledTableCell align='center'>{row.purchases}</StyledTableCell>
              <StyledTableCell align='center'>{row.dates}</StyledTableCell>
              <StyledTableCell align='left'>{row.add}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody> */
}
