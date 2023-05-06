import { Link, useNavigate } from 'react-router-dom'
import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const Card = ({
  className,
  style,
  variant,
  link,
  title,
  label1,
  value1,
  label2,
  value2,
  children,
}) => {
  const navigate = useNavigate()

  const handleClick = (e) => {
    if (typeof link === 'string') {
      return
    }

    e.preventDefault()
    navigate(link.pathname, { state: link.state })
  }
  return (
    <MuiCard variant='' className={className}>
      <CardContent style={style}>
        <Typography variant={variant} sx={{ mb: 1.5 }}>
          {typeof link === 'string' ? (
            <Link to={link}>{title}</Link>
          ) : (
            <Link to='#' onClick={handleClick}>
              {title}
            </Link>
          )}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          {label1}
          {/* : */}
          {value1}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          {label2}
          {/* : */}
          {value2}
        </Typography>
        {children}
      </CardContent>
      <br></br>
    </MuiCard>
  )
}

export default Card
