import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { AdoptionProps } from '@/utils/interfaces'
import type { RootState } from '../StoreContext'

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL || ''

interface AdoptionState {
	allItems: AdoptionProps[]
	userItems: AdoptionProps[]
	loading: boolean
	error: string | null
}

const initialState: AdoptionState = {
	allItems: [],
	userItems: [],
	loading: false,
	error: null,
}

// Gets all adoptions from backend route /adoption
export const fetchAdoptions = createAsyncThunk<AdoptionProps[], void, { state: RootState; rejectValue: string }>(
	'adoption/fetchAdoptions',
	async (_, { getState, rejectWithValue }) => {
		try {
			const token = getState().auth.user.token

			const res = await fetch(`${EXPO_PUBLIC_API_URL}/adoption`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					...(token ? { Authorization: `Bearer ${token}` } : {}),
				},
			})

			const data = await res.json()

			if (!res.ok) {
				throw new Error(data?.message || 'Error fetching adoptions')
			}

			return Array.isArray(data) ? (data as AdoptionProps[]) : ((data?.adoptions || []) as AdoptionProps[])
		} catch (error: any) {
			console.error('Error getting adoptions:', error)
			return rejectWithValue(error.message || 'Error fetching adoptions')
		}
	}
)

// Gets adoptions by user id from backend route /adoption/user/:userId
export const fetchAdoptionsByUserId = createAsyncThunk<
	AdoptionProps[],
	number | string,
	{ state: RootState; rejectValue: string }
>('adoption/fetchAdoptionsByUserId', async (userId, { getState, rejectWithValue }) => {
	try {
		const token = getState().auth.user.token

		const res = await fetch(`${EXPO_PUBLIC_API_URL}/adoption/user/${userId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
		})

		const data = await res.json()

		if (!res.ok) {
			throw new Error(data?.message || 'Error fetching user adoptions')
		}

		return Array.isArray(data) ? (data as AdoptionProps[]) : ((data?.adoptions || []) as AdoptionProps[])
	} catch (error: any) {
		console.error('Error getting user adoptions:', error)
		return rejectWithValue(error.message || 'Error fetching user adoptions')
	}
})

// Creates a new adoption via POST /adoption
export const createAdoption = createAsyncThunk<AdoptionProps, FormData, { state: RootState; rejectValue: string }>(
	'adoption/createAdoption',
	async (formData, { getState, rejectWithValue }) => {
		try {
			const token = getState().auth.user.token

			const res = await fetch(`${EXPO_PUBLIC_API_URL}/adoption`, {
				method: 'POST',
				headers: {
					...(token ? { Authorization: `Bearer ${token}` } : {}),
				},
				body: formData,
			})

			const data = await res.json()

			if (!res.ok) {
				throw new Error(data?.message || 'Error creating adoption')
			}

			return data as AdoptionProps
		} catch (error: any) {
			console.error('Error creating adoption:', error)
			return rejectWithValue(error.message || 'Error creating adoption')
		}
	}
)

// Updates an adoption via PATCH /adoption/:id
export const updateAdoption = createAsyncThunk<
	AdoptionProps,
	{ id: number | string; formData: FormData },
	{ state: RootState; rejectValue: string }
>('adoption/updateAdoption', async ({ id, formData }, { getState, rejectWithValue }) => {
	try {
		const token = getState().auth.user.token

		const res = await fetch(`${EXPO_PUBLIC_API_URL}/adoption/${id}`, {
			method: 'PATCH',
			headers: {
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
			body: formData,
		})

		const data = await res.json()

		if (!res.ok) {
			throw new Error(data?.message || 'Error updating adoption')
		}

		return data as AdoptionProps
	} catch (error: any) {
		console.error('Error updating adoption:', error)
		return rejectWithValue(error.message || 'Error updating adoption')
	}
})

const adoptionSlice = createSlice({
	name: 'adoption',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAdoptions.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchAdoptions.fulfilled, (state, action) => {
				state.loading = false
				state.allItems = action.payload
			})
			.addCase(fetchAdoptions.rejected, (state, action) => {
				state.loading = false
				state.error = (action.payload as string) || 'Error fetching adoptions'
			})
			.addCase(fetchAdoptionsByUserId.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchAdoptionsByUserId.fulfilled, (state, action) => {
				state.loading = false
				state.userItems = action.payload
			})
			.addCase(fetchAdoptionsByUserId.rejected, (state, action) => {
				state.loading = false
				state.error = (action.payload as string) || 'Error fetching user adoptions'
			})
			.addCase(createAdoption.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(createAdoption.fulfilled, (state, action) => {
				state.loading = false
				state.allItems = [action.payload, ...state.allItems]
			})
			.addCase(createAdoption.rejected, (state, action) => {
				state.loading = false
				state.error = (action.payload as string) || 'Error creating adoption'
			})
			.addCase(updateAdoption.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(updateAdoption.fulfilled, (state, action) => {
				state.loading = false
				state.allItems = state.allItems.map((item) => (item.id === action.payload.id ? action.payload : item))
				state.userItems = state.userItems.map((item) => (item.id === action.payload.id ? action.payload : item))
			})
			.addCase(updateAdoption.rejected, (state, action) => {
				state.loading = false
				state.error = (action.payload as string) || 'Error updating adoption'
			})
	},
})

export const selectAdoptions = (state: RootState) => state.adoption.allItems
export const selectAllAdoptions = (state: RootState) => state.adoption.allItems
export const selectUserAdoptions = (state: RootState) => state.adoption.userItems
export const selectAdoptionsLoading = (state: RootState) => state.adoption.loading
export const selectAdoptionsError = (state: RootState) => state.adoption.error

export default adoptionSlice.reducer
