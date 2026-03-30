import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalSignInState {
  openModalSignIn: boolean
}

const initialState: ModalSignInState = {
  openModalSignIn: false,
}

const modalSignInSlice = createSlice({
  name: 'modalSignIn',
  initialState,
  reducers: {
    setOpenModalSignIn: (state, action: PayloadAction<boolean>) => {
      state.openModalSignIn = action.payload
    },
  },
})

export const { setOpenModalSignIn } = modalSignInSlice.actions
export default modalSignInSlice.reducer
