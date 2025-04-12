import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RegisterData, LoginData } from '../../interfaces'

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7777/auth' }),
	endpoints: builder => ({
		register: builder.mutation<void, RegisterData>({
			query: userData => ({
				url: '/register',
				method: 'POST',
				body: userData,
			}),
		}),

		login: builder.mutation<{ accessToken: string }, LoginData>({
			query: userData => ({
				url: '/login',
				method: 'POST',
				body: userData,
				credentials: 'include',
			}),
		}),
	}),
})

export const { useLoginMutation, useRegisterMutation } = authApi
