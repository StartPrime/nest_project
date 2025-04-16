import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../../interfaces'
import { RootState } from '../store'
import { BasketState } from '../../interfaces'

interface Products {
	products: BasketState[]
}

const initialState: Products = {
	products: [],
}

const basketSlice = createSlice({
	name: 'basket',
	initialState,
	reducers: {
		addProduct(state, action: PayloadAction<Product>) {
			const productIndex = state.products.findIndex(
				product => product.product.id === action.payload.id
			)
			if (productIndex !== -1) {
				state.products[productIndex].count += 1
			} else {
				state.products.push({ product: action.payload, count: 1 })
			}
		},

		removeProduct(state, action: PayloadAction<number>) {
			const productIndex = state.products.findIndex(
				product => product.product.id === action.payload
			)
			if (productIndex !== -1) {
				if (state.products[productIndex].count > 1) {
					state.products[productIndex].count -= 1
				} else {
					state.products.splice(productIndex, 1)
				}
			}
		},
	},
})

export const { addProduct, removeProduct } = basketSlice.actions
export default basketSlice.reducer

export const selectBasketTotalItems = (state: RootState) =>
	state.persistedReducer.basket.products.reduce(
		(total, item) => (total += item.count),
		0
	)

export const selectBasketTotalPrice = (state: RootState) =>
	state.persistedReducer.basket.products.reduce(
		(total, item) => (total += item.product.price * item.count),
		0
	)
