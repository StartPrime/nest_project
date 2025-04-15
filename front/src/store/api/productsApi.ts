import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Category, Product } from '../../interfaces'

export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7777' }),
	endpoints: builder => ({
		getProducts: builder.query<Category[], void>({
			query: () => '/products',
		}),

		getProduct: builder.query<Product, string>({
			query: id => `/products/${id}`,
		}),
	}),
})

export const { useGetProductsQuery, useGetProductQuery } = productsApi
