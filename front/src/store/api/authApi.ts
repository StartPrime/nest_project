import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RegisterData, LoginData } from '../../interfaces'
import { userApi } from './userApi'
import { userSlice } from '../slices/userReducer'

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:7777/auth',
		credentials: 'include', // Добавляем для поддержки httpOnly cookies
	}),
	endpoints: builder => ({
		register: builder.mutation<void, RegisterData>({
			query: userData => ({
				url: '/register',
				method: 'POST',
				body: userData,
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled
					const { email, password } = arg
					dispatch(
						authApi.endpoints.login.initiate({ email, password })
					).unwrap()
				} catch (err) {
					console.error('Ошибка регистрации или входа:', err)
				}
			},
		}),

		login: builder.mutation<{ accessToken: string }, Omit<LoginData, 'name'>>({
			query: userData => ({
				url: '/login',
				method: 'POST',
				body: userData,
				credentials: 'include',
			}),
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled
					localStorage.setItem('accessToken', data.accessToken)
					dispatch(userApi.endpoints.getUserData.initiate()).unwrap()
				} catch (err) {
					console.error('Ошибка входа:', err)
				}
			},
		}),

		logout: builder.mutation<void, void>({
			query: () => ({
				url: '/logout',
				method: 'POST',
				credentials: 'include',
			}),
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				dispatch(userSlice.actions.clearUser())
				localStorage.removeItem('accessToken')

				try {
					await queryFulfilled
					dispatch(userApi.util.resetApiState())
				} catch (err) {
					console.error('Ошибка при выходе:', err)
				}
			},
		}),
	}),
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
	authApi
