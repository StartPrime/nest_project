import { configureStore } from '@reduxjs/toolkit'
import { productsApi } from './api/productsApi'
import { authApi } from './api/authApi'

export const store = configureStore({
	reducer: {
		[productsApi.reducerPath]: productsApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
	},

	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(productsApi.middleware, authApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
