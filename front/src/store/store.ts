import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { productsApi } from './api/productsApi'
import { authApi } from './api/authApi'
import { userApi } from './api/userApi'
import userReducer from './slices/userReducer'
import favoritesReducer from './slices/favoritesReducer'
import storage from 'redux-persist/lib/storage'
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	persistStore,
} from 'redux-persist'

const rootReducer = combineReducers({
	user: userReducer,
	favorites: favoritesReducer,
})

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['favorites'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: {
		[productsApi.reducerPath]: productsApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		persistedReducer,
	},

	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(productsApi.middleware, authApi.middleware, userApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)
