import { useSelector, useDispatch } from 'react-redux'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { showToast, hideToast } from '../../features/toasts/toastsSlice'

const Toasts = ({ navigate, path }) => {
  const { showToast: open, message } = useSelector((state) => state.toasts)
  const dispatch = useDispatch()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(hideToast())
    navigate && navigate(path)
  }

  const action = (
    <>
      <Button color='secondary' size='small' onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleClose}>
        <CloseIcon fontSize='small' />
      </IconButton>
    </>
  )

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </div>
  )
}

export default Toasts
