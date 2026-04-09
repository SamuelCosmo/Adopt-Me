import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../StoreContext'
import type { SpeciesOption, BreedOption } from '@/utils/interfaces'

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL || ''

interface PetOptionsState {
  species: SpeciesOption[]
  breeds: BreedOption[]
  loading: boolean
  error: string | null
}

const initialState: PetOptionsState = {
  species: [],
  breeds: [],
  loading: false,
  error: null,
}

export const fetchPetOptions = createAsyncThunk<
  { species: SpeciesOption[]; breeds: BreedOption[] },
  void,
  { state: RootState; rejectValue: string }
>('petOptions/fetchPetOptions', async (_, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.user.token

    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }

    const [speciesRes, breedRes] = await Promise.all([
      fetch(`${EXPO_PUBLIC_API_URL}/species`, { method: 'GET', headers }),
      fetch(`${EXPO_PUBLIC_API_URL}/breed`, { method: 'GET', headers }),
    ])

    const speciesData = await speciesRes.json()
    const breedData = await breedRes.json()

    if (!speciesRes.ok || !breedRes.ok) {
      throw new Error('Error loading species and breeds')
    }

    return {
      species: Array.isArray(speciesData) ? (speciesData as SpeciesOption[]) : ((speciesData?.species || []) as SpeciesOption[]),
      breeds: Array.isArray(breedData) ? (breedData as BreedOption[]) : ((breedData?.breeds || []) as BreedOption[]),
    }
  } catch (error: any) {
    console.error('Error loading pet options:', error)
    return rejectWithValue(error.message || 'Error loading species and breeds')
  }
})

const petOptionsSlice = createSlice({
  name: 'petOptions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPetOptions.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPetOptions.fulfilled, (state, action) => {
        state.loading = false
        state.species = action.payload.species
        state.breeds = action.payload.breeds
      })
      .addCase(fetchPetOptions.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || 'Error loading species and breeds'
      })
  },
})

export const selectSpeciesOptions = (state: RootState) => state.petOptions.species
export const selectBreedOptions = (state: RootState) => state.petOptions.breeds
export const selectPetOptionsLoading = (state: RootState) => state.petOptions.loading
export const selectPetOptionsError = (state: RootState) => state.petOptions.error

export default petOptionsSlice.reducer
