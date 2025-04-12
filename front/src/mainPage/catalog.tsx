import { useGetProductsQuery } from '../store/api/productsApi'
import Loader from '../components/loader'
import Container from '../components/container'
import Category from './category'

export default function Catalog() {
	const { data, isError, isLoading } = useGetProductsQuery()

	if (isLoading) {
		return (
			<Container classes='flex items-center justify-center mt-24'>
				<Loader />
			</Container>
		)
	}

	if (isError) {
		return (
			<Container classes='flex items-center justify-center mt-24'>
				<p className='text-red-600 text-2xl'>
					Произошла ошибка при получении товаров
				</p>
			</Container>
		)
	}

	return (
		<Container classes='mt-12'>
			<main>
				{data?.map(category => (
					<Category category={category} key={category.categoryId} />
				))}
			</main>
		</Container>
	)
}
