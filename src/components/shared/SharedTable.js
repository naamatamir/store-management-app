import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const SharedTable = ({ headers, data, rowStyle, columnStyle }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header} style={{ textAlign: 'center' }}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.length > 0
            ? data.map((row, index) => (
                <TableRow key={index} style={rowStyle}>
                  <TableCell style={columnStyle.property1}>
                    {row.property1}
                    {/* {Array.isArray(row.property1)
                  ? row.property1.map((p1) => p1)
                  : row.property1} */}
                  </TableCell>
                  <TableCell style={columnStyle.property2}>
                    {' '}
                    {Array.isArray(row.property2)
                      ? row.property2.map((p2) => p2)
                      : row.property2}
                  </TableCell>
                  <TableCell style={columnStyle.property3}>
                    {' '}
                    {Array.isArray(row.property3)
                      ? row.property3.map((p3) => p3)
                      : row.property3}
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SharedTable
