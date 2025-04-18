import { Product } from '../interfaces'
import { useDispatch } from 'react-redux'
import { removeFavorite } from '../store/slices/favoritesReducer'
import { useNavigate } from 'react-router-dom'
import { FaRegTrashCan } from 'react-icons/fa6'

interface Props {
	product: Product
}

export default function Favorites({ product }: Props) {
	const dispatch = useDispatch()

	const navigate = useNavigate()

	const handleRemoveFavorite = (e: React.MouseEvent, productId: number) => {
		e.stopPropagation()
		dispatch(removeFavorite(productId))
	}

	return (
		<article
			className='flex items-center gap-4 p-4 cursor-pointer bg-white rounded-4xl shadow'
			key={product.id}
			onClick={() => navigate(`/products/${product.id}`)}
		>
			<div className='flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24'>
				<img
					className='w-full h-full rounded-lg object-cover'
					src={product.imageUrl}
					alt={product.name}
				/>
			</div>
			<div className='flex justify-between w-full min-[400px]:items-center max-[400px]:flex-col'>
				<div className='flex-1 min-w-0'>
					<p className='text-base font-medium text-gray-900 line-clamp-2'>
						{product.name}
					</p>
				</div>
				<div className='flex items-center gap-4 max-[400px]:justify-between'>
					<span className='text-lg font-semibold text-orange-400 whitespace-nowrap'>
						{product.price} ₽
					</span>
					<button
						onClick={e => handleRemoveFavorite(e, product.id)}
						className='p-2 hover:bg-gray-100 rounded-full cursor-pointer'
					>
						<FaRegTrashCan size={20} className='text-red-600' />
					</button>
				</div>
			</div>
		</article>
	)
}
