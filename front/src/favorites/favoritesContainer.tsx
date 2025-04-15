import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { FaHeart } from 'react-icons/fa'
import Container from '../components/container'
import Favorites from './favorites'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

export default function FavoritesContainer() {
	const favorites = useSelector(
		(state: RootState) => state.persistedReducer.favorites.products
	)

	const navigate = useNavigate()

	return (
		<Container>
			<section className='my-12'>
				<div className='flex items-center justify-between mb-8'>
					<h1 className='text-3xl font-bold text-gray-900'>Избранное</h1>
					<span className='inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-orange-400 text-white'>
						{favorites.length} {favorites.length === 1 ? 'товар' : 'товаров'}
					</span>
				</div>
				<div
					className='flex gap-2 items-center mb-4 duration-200 hover:scale-105 cursor-pointer w-max'
					onClick={() => {
						navigate(-1)
					}}
				>
					<FaArrowLeftLong />
					<p>Назад</p>
				</div>
				{favorites.length === 0 ? (
					<div className='text-center py-16'>
						<FaHeart className='mx-auto h-12 w-12 text-orange-400' />
						<h3 className='mt-4 text-lg font-medium text-gray-900'>
							Ваш список избранного пуст
						</h3>
						<p className='mt-2 text-gray-500'>
							Добавляйте товары, нажимая на значок сердца
						</p>
					</div>
				) : (
					<div className='overflow-hidden relative flex flex-col gap-4'>
						{favorites.map(product => (
							<Favorites product={product} key={product.id} />
						))}
					</div>
				)}
			</section>
		</Container>
	)
}
