import { Button as MuiButton } from '@mui/material'

const Button = ({
  children,
  color,
  size,
  onClick,
  startIcon,
}) => {
  const allowedSizes = ['small', 'medium', 'large'];
  const sizeClass = allowedSizes.includes(size) ? size : 'medium';

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
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
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.26)',
        transition: 'all 0.3s ease-in-out',
      }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      startIcon={startIcon}>
      {children}
    </MuiButton>
  )
}

export default Button
