import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setOpenModalSignIn } from './modalSignInSlice'
import * as SecureStore from 'expo-secure-store'
import type { RootState } from '../StoreContext'

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL || ''
const AUTH_SESSION_KEY = 'auth_session'

interface AuthState {
  token: string
  isAuthenticated: boolean
}

const initialState: AuthState = {
  token: '',
  isAuthenticated: false,
}

interface StoredSession {
  id: number
  name: string
  email: string
  profile_image: string
  token: string
}

const storeSession = async (session: StoredSession) => {
  await SecureStore.setItemAsync(AUTH_SESSION_KEY, JSON.stringify(session))
}

const clearStoredSession = async () => {
  await SecureStore.deleteItemAsync(AUTH_SESSION_KEY)
}

// Thunk to restore persisted auth session
export const restoreSession = createAsyncThunk('auth/restoreSession', async (_, { dispatch, rejectWithValue }) => {
  try {
    const rawSession = await SecureStore.getItemAsync(AUTH_SESSION_KEY)
    if (!rawSession) return null

    const session = JSON.parse(rawSession) as Partial<StoredSession>
    if (!session.token) return null

    dispatch(setAuthState(session.token))
    dispatch(setOpenModalSignIn(false))
    return session
  } catch (error: any) {
    console.error('Error restoring session:', error)
    return rejectWithValue(error.message || 'Restore session failed')
  }
})

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
  },
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
        await storeSession({ id: data.user.id || 0, name: data.user.name, email: data.user.email, profile_image: data.user.profile_image, token: data.token })
        dispatch(setAuthState(data.token))
        dispatch(setOpenModalSignIn(false))
        alert('Login Successful.')
        return data
      } else {
        throw new Error(data.message || 'Login failed')
      }
    } catch (error: any) {
      console.error('Error during sign-in:', error)
      return rejectWithValue(error.message || 'Login failed')
    }
  },
)

// Thunk for signing out a user
export const signOutUser = createAsyncThunk(
  'auth/signOutUser',
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const token = (getState() as RootState).auth.token
      if (!token) {
        throw new Error('Missing auth token')
      }

      const res = await fetch(`${EXPO_PUBLIC_API_URL}/user/signout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ token }),
      })

      const data = await res.json()
      if (res.status === 200) {
        await clearStoredSession()
        dispatch(clearAuth())
        dispatch(setOpenModalSignIn(true))
        return data
      } else {
        throw new Error(data.message || 'Sign-out failed')
      }
    } catch (error: any) {
      console.error('Error during sign-out:', error)

      await clearStoredSession()
      dispatch(clearAuth())
      dispatch(setOpenModalSignIn(true))
      return rejectWithValue(error.message || 'Sign-out failed')
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      state.isAuthenticated = !!action.payload
    },
    clearAuth: (state) => {
      state.token = ''
      state.isAuthenticated = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signOutUser.fulfilled, (state) => {
      state.token = ''
      state.isAuthenticated = false
    })
    builder.addCase(restoreSession.rejected, (state) => {
      state.token = ''
      state.isAuthenticated = false
    })
    builder.addCase(loginUser.rejected, (state) => {
      state.token = ''
      state.isAuthenticated = false
    })
  },
})

export const { setAuthState, clearAuth } = authSlice.actions
export default authSlice.reducer
