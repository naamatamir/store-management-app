import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import CustomersTableRow from './CustomersTableRow'
import { selectCustomers } from '../../../features/customers/customersSlice'
import { useSelector } from 'react-redux'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'white',
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    fontSize: '1.1rem',
    maxWidth: '50px',
    textAlign: 'left',
  },
}))

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  // mobile
  [theme.breakpoints.down('sm')]: {
    maxWidth: '96%',
  },
  // desktop
  [theme.breakpoints.up('md')]: {
    maxWidth: '1000px',
  },
}))

const CustomersTable = () => {
  const customers = useSelector(selectCustomers)

  return (
    <StyledTableContainer
      component={Paper}
      style={{
        margin: 'auto',
        border: '1 solid #ccc',
        borderRadius: '5',
        boxShadow: '0 2 8 rgba(0, 0, 0, 0.26)',
        transition: 'all 0.3s ease-in-out',
      }}>
      <Table
        aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Purchases</StyledTableCell>
            <StyledTableCell>Dates</StyledTableCell>
            <StyledTableCell>Add Product</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <CustomersTableRow key={customer.id} customer={customer} />
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  )
}

export default CustomersTable
