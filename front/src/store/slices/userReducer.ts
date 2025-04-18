import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserData } from '../../interfaces'

interface UserState {
	user: UserData | null
}

const initialState: UserState = {
	user: null,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserData>) => {
			state.user = action.payload
		},
		clearUser: state => {
			state.user = null
		},
	},
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
