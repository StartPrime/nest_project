import { useNavigate, useParams } from 'react-router-dom'
import Container from '../components/container'
import { useGetProductQuery } from '../store/api/productsApi'
import { GrBasket } from 'react-icons/gr'
import Loader from '../components/loader'
import { FaArrowLeftLong } from 'react-icons/fa6'

export default function Product() {
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
				<div className='bg-white rounded-4xl shadow-lg overflow-hidden'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						{/* Изображение товара */}
						<div className='p-6 md:p-8'>
							<div className='aspect-square overflow-hidden'>
								<img
									src={product.imageUrl}
									alt={product.name}
									className='w-full h-full object-contain object-center pointer-events-none'
								/>
							</div>
						</div>
						{/* Информация о товаре */}
						<div className='p-6 md:p-8 md:pr-10'>
							<div className='space-y-6'>
								<div>
									<h1 className='text-3xl font-bold text-gray-900'>
										{product.name}
									</h1>
									<p className='text-lg text-gray-500 mt-2'>{product.brand}</p>
								</div>
								<div className='text-4xl font-bold text-orange-400'>
									₽{product.price}
								</div>
								<div className='flex items-center gap-4'>
									<span className='text-gray-700'>Цвет:</span>
									<div
										className='w-8 h-8 rounded-full border border-gray-200'
										style={{ backgroundColor: product.color }}
										title={product.color}
									/>
								</div>
								<button className='w-full bg-orange-400 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 cursor-pointer'>
									<GrBasket />
									Добавить в корзину
								</button>
								<div className='pt-6 border-t border-gray-200'>
									<h2 className='text-xl font-medium text-gray-900 mb-4'>
										Описание
									</h2>
									<p className='text-gray-600 leading-relaxed'>
										{product.description}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</section>
	)
}
