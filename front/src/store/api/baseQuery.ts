// src/api/baseQuery.ts
import {
	fetchBaseQuery,
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:7777',
	prepareHeaders: headers => {
		const token = localStorage.getItem('accessToken')
		if (token) {
			headers.set('Authorization', `Bearer ${token}`)
		}
		return headers
	},
})

export const baseQueryApi: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions)

	if (result.error?.status === 401) {
		const refreshResult = await baseQuery(
			{
				url: '/auth/refresh',
				method: 'POST',
				credentials: 'include',
			},
			api,
			extraOptions
		)

		if (refreshResult.data) {
			const { accessToken } = refreshResult.data as { accessToken: string }
			localStorage.setItem('accessToken', accessToken)

			result = await baseQuery(args, api, extraOptions)
		} else {
			localStorage.removeItem('accessToken')
		}
	}

	return result
}
