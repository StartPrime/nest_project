import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../../interfaces'

export interface FavoritesState {
	products: Product[]
}

const initialState: FavoritesState = {
	products: [],
}

export const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		addFavorite(state, action: PayloadAction<Product>) {
			console.log(action.payload)
			state.products.push(action.payload)
		},

		removeFavorite(state, action: PayloadAction<number>) {
			state.products = state.products.filter(
				product => product.id !== action.payload
			)
		},
	},
})

export const { addFavorite, removeFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer
