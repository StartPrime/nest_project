import { useNavigate, useParams } from 'react-router-dom'
import Product from './product'
import { useGetProductQuery } from '../store/api/productsApi'
import Container from '../components/container'
import Loader from '../components/loader'
import { FaArrowLeftLong } from 'react-icons/fa6'

export default function ProductPage() {
	const { id } = useParams<{ id: string }>()
	const {
		data: product,
		isLoading,
		isError,
	} = useGetProductQuery(id ?? '', {
		skip: !id,
	})
	const navigate = useNavigate()

	if (isLoading) {
		return (
			<section className='min-h-screen flex items-center justify-center'>
				<Container>
					<Loader />
				</Container>
			</section>
		)
	}

	if (isError || !product) {
		return (
			<section className='min-h-screen flex items-center justify-center'>
				<Container>
					<p className='text-2xl text-red-600'>Не удалось загрузить товар</p>
				</Container>
			</section>
		)
	}
	return (
		<section className='py-12'>
			<Container>
				<div
					className='flex gap-2 items-center mb-4 duration-200 hover:scale-105 cursor-pointer w-max'
					onClick={() => {
						navigate(-1)
					}}
				>
					<FaArrowLeftLong />
					<p>Назад</p>
				</div>
				<Product product={product} />
			</Container>
		</section>
	)
}
