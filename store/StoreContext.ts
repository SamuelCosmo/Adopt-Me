import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import modalSignInReducer from './slices/modalSignInSlice'

export const store = configureStore({
  reducer: { auth: authReducer, modalSignIn: modalSignInReducer },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
