import { useNavigate } from 'react-router-dom'
import Button from '../components/shared/Button'
import { Box } from '@mui/material'
import InventoryIcon from '@mui/icons-material/Inventory'
import PeopleIcon from '@mui/icons-material/People'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'

const StyledBox = (props) => (
  <Box
    component='form'
    sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      marginBottom: '10px',
      backgroundColor: '#f5f5f5',
      border: '1px solid #ccc',
      '& > :not(style)': { m: 1.2, width: '23ch', height: 52 },
      '@media (max-width: 599px)': {
        flexDirection: 'column',
        alignItems: 'center',
      },
    }}
    {...props}
  />
)
const Menu = () => {
  const navigate = useNavigate()

  return (
    <StyledBox>
      <Button
        onClick={() => navigate('/products')}
        startIcon={<InventoryIcon />}>
        Products
      </Button>
      <Button onClick={() => navigate('/customers')} startIcon={<PeopleIcon />}>
        Customers
      </Button>
      <Button
        onClick={() => navigate('/purchases')}
        startIcon={<ShoppingBasketIcon />}>
        Purchases
      </Button>
    </StyledBox>
  )
}

export default Menu
