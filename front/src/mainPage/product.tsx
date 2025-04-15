import { useNavigate } from 'react-router-dom'
import { Product as IProduct } from '../interfaces'
import { CiHeart } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, removeFavorite } from '../store/slices/favoritesReducer'
import { RootState } from '../store/store'
import { FaHeart } from 'react-icons/fa'

interface Props {
	product: IProduct
}

export default function Product({ product }: Props) {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const products = useSelector(
		(state: RootState) => state.persistedReducer.favorites.products
	)
	const isFavorite =
		products && products.filter(item => item.id === product.id).length

	return (
		<article
			className='xl:w-[32%] w-[48%] max-h-[410px] flex flex-col justify-between 
			bg-white mb-4 px-4 py-6 rounded-4xl shadow cursor-pointer duration-200 hover:scale-102 relative'
		>
			<div
				className='h-[70%] flex items-center justify-center'
				onClick={() => {
					navigate(`/products/${product.id}`)
				}}
			>
				<img
					src={product.imageUrl}
					alt={product.name}
					className='h-full w-full object-contain pointer-events-none'
				/>
			</div>
			<div
				className='flex justify-between sm:gap-4 sm:flex-row flex-col max-h-[30%] '
				onClick={() => {
					navigate(`/products/${product.id}`)
				}}
			>
				<h1 className='sm:text-[18px] text-sm font-medium'>{product.name}</h1>
				<p className='text-orange-400 font-medium text-nowrap sm:text-base text-xs'>
					{product.price} ₽
				</p>
			</div>
			{!isFavorite ? (
				<CiHeart
					size={30}
					className='absolute top-4 right-4 text-orange-400'
					onClick={() => dispatch(addFavorite(product))}
				/>
			) : (
				<FaHeart
					size={25}
					className='absolute top-5 right-5 text-orange-400'
					onClick={() => dispatch(removeFavorite(product.id))}
				/>
			)}
		</article>
	)
}
