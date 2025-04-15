import { configureStore } from '@reduxjs/toolkit'
import { productsApi } from './api/productsApi'
import { authApi } from './api/authApi'
import { userApi } from './api/userApi'
import userReducer from './slices/userReducer'
import favoritesReducer from './slices/userReducer'

export const store = configureStore({
	reducer: {
		[productsApi.reducerPath]: productsApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		user: userReducer,
		favorites: favoritesReducer,
	},

	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(
			productsApi.middleware,
			authApi.middleware,
			userApi.middleware
		),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
