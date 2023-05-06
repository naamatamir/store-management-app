import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import Typography from '@mui/material/Typography'

const SharedList = ({ data, headerText, handleItemClick, context }) => {
  return (
    <List
      className='shared-list'
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
          {headerText}
        </ListSubheader>
      }>
      {data && data.length > 0 ? (
        data.map((item) => (
          <ListItem key={item.id} sx={{ padding: '0' }}>
            <ListItemText
              primary={
                <Typography
                  component='a'
                  href='#'
                  onClick={(e) => handleItemClick(e, item)}
                  sx={{ textDecoration: 'underline', color: 'inherit' }}>
                  {context === 'customer'
                    ? `${item.firstName} ${item.lastName}`
                    : item.name}
                </Typography>
              }
            />
          </ListItem>
        ))
      ) : (
        <ListItem>
          <ListItemText primary='No items available' />
        </ListItem>
      )}
    </List>
  )
}

export default SharedList
