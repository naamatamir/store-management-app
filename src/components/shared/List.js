import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import Typography from '@mui/material/Typography'

export default function CustomerPurchasesList({
  purchasesOfProduct,
  handleCustomerClick,
}) {
  return (
    <List
      className='purchased-list'
      sx={{
        width: 215,
        margin: '0 auto',
        backgroundColor: '#f5f5f5',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.26)',
        transition: 'all 0.3s ease-in-out',
        paddingLeft: '1rem ',
        overflow: 'auto',
        maxHeight: 150,
        '@media (min-width: 768px)': {
          width: 445,
        },
      }}
      subheader={
        <ListSubheader
          className='list-subheader'
          sx={{ backgroundColor: '#f5f5f5' }}>
          Purchased by
        </ListSubheader>
      }>
      {purchasesOfProduct && purchasesOfProduct.length > 0 ? (
        purchasesOfProduct.map((customer) => (
          <ListItem
            key={customer.id}
            sx={{
              padding: ' 0',
            }}>
            <ListItemText
              primary={
                <Typography
                  component='a'
                  href='#'
                  onClick={(e) => handleCustomerClick(e, customer)}
                  sx={{ textDecoration: 'underline', color: 'inherit' }}>
                  {`${customer.firstName} ${customer.lastName}`}
                </Typography>
              }
            />
          </ListItem>
        ))
      ) : (
        <ListItem>
          <ListItemText primary='No purchases for this Product' />
        </ListItem>
      )}
    </List>
  )
}
