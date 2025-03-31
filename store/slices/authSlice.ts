import { User } from '@/utils/interfaces'
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { setOpenModalSignIn } from './modalSignInSlice'
const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL || ''

interface AuthState {
  user: User
}

const initialState: AuthState = {
  user: { name: '', email: '', password: '', token: '' },
}

// Thunk for signing up a user
export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async ({ name, email, password }: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${EXPO_PUBLIC_API_URL}/user/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (res.status === 201) {
        alert('User Created Successfully.')
        return data
      } else {
        throw new Error(data.message || 'Sign Up failed')
      }
    } catch (error: any) {
      console.error('Error during creating user:', error)
      return rejectWithValue(error.message || 'Sign Up failed')
    }
  }
)

// Thunk for logging in a user
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }, { dispatch, rejectWithValue }) => {
    try {
      console.log('Trying to login: ', email, password, EXPO_PUBLIC_API_URL)

      const res = await fetch(`${EXPO_PUBLIC_API_URL}/user/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (res.status === 200) {
        dispatch(signIn({ name: data.user.name, email: data.user.email, password: '', token: data.token }))
        dispatch(setOpenModalSignIn(false))
        return data
      } else {
        throw new Error(data.message || 'Login failed')
      }
    } catch (error: any) {
      console.error('Error during sign-in:', error)
      return rejectWithValue(error.message || 'Login failed')
    }
  }
)

// Thunk for signing out a user
export const signOutUser = createAsyncThunk(
  'auth/signOutUser',
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const token = (getState() as any).auth.user.token
      const res = await fetch(`${EXPO_PUBLIC_API_URL}/user/signout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })

      const data = await res.json()
      if (res.status === 200) {
        dispatch(signOut())
        dispatch(setOpenModalSignIn(true))
        return data
      } else {
        throw new Error(data.message || 'Sign-out failed')
      }
    } catch (error: any) {
      console.error('Error during sign-out:', error)
      return rejectWithValue(error.message || 'Sign-out failed')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signUp: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    signIn: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    signOut: (state) => {
      state.user = { name: '', password: '', email: '', token: '' }
    },
  },
})

export const { signUp, signIn, signOut } = authSlice.actions
export default authSlice.reducer
