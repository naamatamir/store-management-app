import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showToast: false,
  message: '',
  type: '',
}

export const toastsSlice = createSlice({
  name: 'toasts',
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.showToast = true
      state.message = action.payload.message
      state.type = action.payload.type
    },
    hideToast: (state) => {
      state.showToast = false
      state.message = ''
      state.type = ''
    },
  },
})

export const { showToast, hideToast } = toastsSlice.actions

export default toastsSlice.reducer
