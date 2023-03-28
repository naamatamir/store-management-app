import Typography from '@mui/material/Typography'

const PageHeader = ({ title }) => (
  <>
    <Typography
      sx={{
        padding: '1rem',
        fontFamily: 'monospace',
        fontWeight: 700,
        textAlign: 'center',
        fontSize: '2.1rem',
        '@media (max-width: 599px)': {
          fontSize: '1.7rem',
        },
      }}>
      {title}
    </Typography>
  </>
)
 
export default PageHeader
