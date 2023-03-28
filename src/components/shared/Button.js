import { Button as MuiButton } from '@mui/material'
// import { useTheme } from '@mui/material'

const Button = ({
  children,
  // variant,
  color,
  size,
  onClick,
  startIcon,
}) => {
  const allowedSizes = ['small', 'medium', 'large'];
  const sizeClass = allowedSizes.includes(size) ? size : 'medium';

  //*!check */
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      onClick();
    }
  };
  return (
    <MuiButton
      type='button'
      variant='contained'
      color={color}
      size={sizeClass}
      sx={{
        // height: '48px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.26)',
        transition: 'all 0.3s ease-in-out',
        // backgroundColor: '#1a237e',
      }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      startIcon={startIcon}>
      {children}
    </MuiButton>
  )
}

export default Button
