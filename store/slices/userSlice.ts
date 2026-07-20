import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../StoreContext'
import { User } from '@/utils/interfaces'
import { loginUser, restoreSession, signOutUser } from './authSlice'
const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL || ''

export const updateProfileImage = createAsyncThunk(
  'user/updateProfileImage',
  async (imageUri: string, { getState, rejectWithValue }) => {
    try {
      const token = (getState() as RootState).auth.token

      const formData = new FormData()
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'profile.jpg',
      } as any)

      const res = await fetch(`${EXPO_PUBLIC_API_URL}/user/profile-image`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      const data = await res.json()

      if (res.status === 200) {
        return data
      } else {
        throw new Error(data.message)
      }
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

interface UserState {
  user: User
}

const initialState: UserState = {
  user: { id: 0, name: '', email: '', password: '', profile_image: '', token: '' },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    clearUser: (state) => {
      state.user = { id: 0, name: '', email: '', password: '', profile_image: '', token: '' }
    },
    updateProfileImg: (state, action: PayloadAction<string>) => {
      state.user.profile_image = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload?.user) {
        state.user = {
          id: action.payload.user.id || 0,
          name: action.payload.user.name || '',
          email: action.payload.user.email || '',
          password: '',
          profile_image: action.payload.user.profile_image || '',
          token: '',
        }
      }
    })
    builder.addCase(restoreSession.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = {
          id: action.payload.id || 0,
          name: action.payload.name || '',
          email: action.payload.email || '',
          password: '',
          profile_image: action.payload.profile_image || '',
          token: '',
        }
      }
    })
    builder.addCase(signOutUser.fulfilled, (state) => {
      state.user = { id: 0, name: '', email: '', password: '', profile_image: '', token: '' }
    })
    builder.addCase(updateProfileImage.fulfilled, (state, action) => {
      const profileImage = action.payload?.user?.profile_image ?? action.payload?.profile_image
      if (profileImage) {
        state.user.profile_image = profileImage
      }
    })
  },
})

export const { setUser, clearUser, updateProfileImg } = userSlice.actions
export default userSlice.reducer
