import { createApi } from '@reduxjs/toolkit/query/react'
import { UserData } from '../../interfaces'
import { baseQueryApi } from './baseQuery'
import { clearUser, setUser } from '../slices/userReducer'

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: baseQueryApi,
	endpoints: builder => ({
		getUserData: builder.query<UserData, void>({
			query: () => '/user',
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled
					dispatch(setUser(data))
				} catch {
					dispatch(clearUser())
				}
			},
		}),
	}),
})

export const { useGetUserDataQuery } = userApi
