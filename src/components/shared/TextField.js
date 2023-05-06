import { TextField as MuiTextField } from '@mui/material'

const TextField = ({ label, name, value, onChange }) => {
  const id = `${name}-field`
  return (
    <MuiTextField
      id={id}
      label={label}
      variant='outlined'
      InputLabelProps={{ shrink: true, htmlFor: id, required: true }}
      name={name}
      value={value}
      onChange={onChange}
      aria-describedby={`${id}-helper-text`}
    />
  )
}

export default TextField
