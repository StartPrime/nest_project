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

	// Если токен недействителен (ошибка 401)
	if (result.error?.status === 401) {
		// Пытаемся обновить токен
		const refreshResult = await baseQuery(
			{
				url: '/auth/refresh',
				method: 'POST',
				credentials: 'include', // Для httpOnly refreshToken
			},
			api,
			extraOptions
		)

		if (refreshResult.data) {
			// Сохраняем новый токен
			const { accessToken } = refreshResult.data as { accessToken: string }
			localStorage.setItem('accessToken', accessToken)

			// Повторяем исходный запрос с новым токеном
			result = await baseQuery(args, api, extraOptions)
		} else {
			// Если refresh провалился, очищаем токен (можно добавить logout)
			localStorage.removeItem('accessToken')
		}
	}

	return result
}
