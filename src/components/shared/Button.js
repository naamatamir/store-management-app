import { Button as MuiButton } from '@mui/material'
import {useTheme} from '@mui/material'

const Button = ({
  children,
  // variant,
  color,
  size,
  onClick,
  startIcon,
}) => {
  return (
    <MuiButton
      type='button'
      variant='contained'
      color={color}
      size='medium'
      sx={{
        height: '56px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.26)',
        transition: 'all 0.3s ease-in-out',
        backgroundColor: '#1a237e',
      }}
      onClick={onClick}
      startIcon={startIcon}>
      {children}
    </MuiButton>
  )
}

export default Button
