import { createTheme } from '@mui/material'

const themeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#1a237e',
    },
    secondary: {
      main: '#c2185b',
    },
    error: {
      main: '#d50000',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    h3: {
      fontSize: '2.5rem',
      fontWeight: 900,
      fontFamily: 'monospace',
      '@media (max-width: 599px)': {
        fontSize: '1.8rem',
      },
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.8rem',
      fontFamily: 'monospace',
      lineHeight: 1.5,
    },
    h5: {
      fontWeight: 500,
      lineHeight: 1.6,
    },
    h6: {
      fontWeight: 400,
      lineHeight: 1.34,
      fontSize: '1.5rem',
    },
  },
}

const theme = createTheme(themeOptions)

export default theme
