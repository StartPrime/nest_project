import { GrBasket } from 'react-icons/gr'
import { Product as IProduct } from '../interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, removeProduct } from '../store/slices/basketReducer'
import { RootState } from '../store/store'
import { addFavorite, removeFavorite } from '../store/slices/favoritesReducer'
import { CiHeart } from 'react-icons/ci'
import { FaHeart } from 'react-icons/fa'
import { AiTwotoneDislike, AiTwotoneLike } from 'react-icons/ai'
import { useEffect, useState } from 'react'

interface Props {
	product: IProduct
}

interface ReactionState {
	isLiked: boolean
	isDisliked: boolean
	likes: number
	dislikes: number
}

export default function Product({ product }: Props) {
	const dispatch = useDispatch()

	// Получаем данные о товаре в корзине
	const productCount = useSelector((state: RootState) =>
		state.persistedReducer.basket.products.find(
			item => item.product.id === product.id
		)
	)?.count

	// Проверяем, есть ли товар в избранном
	const isFavorite = useSelector((state: RootState) =>
		state.persistedReducer.favorites.products?.filter(
			item => item.id === product.id
		)
	)

	// Состояние для реакций
	const [reactions, setReactions] = useState<ReactionState>({
		isLiked: false,
		isDisliked: false,
		likes: product.likes || 0,
		dislikes: product.dislikes || 0,
	})

	// Загружаем реакции из localStorage при монтировании
	useEffect(() => {
		const savedReactions = localStorage.getItem(
			`product_${product.id}_reactions`
		)
		if (savedReactions) {
			setReactions(JSON.parse(savedReactions))
		}
	}, [product.id])

	// Сохраняем реакции в localStorage при изменении
	useEffect(() => {
		localStorage.setItem(
			`product_${product.id}_reactions`,
			JSON.stringify(reactions)
		)
	}, [reactions, product.id])

	// Обработчики лайков/дизлайков
	const handleLike = () => {
		setReactions(prev => {
			if (prev.isLiked) {
				return {
					...prev,
					isLiked: false,
					likes: prev.likes - 1,
				}
			} else {
				return {
					isLiked: true,
					isDisliked: false,
					likes: prev.likes + 1,
					dislikes: prev.isDisliked ? prev.dislikes - 1 : prev.dislikes,
				}
			}
		})
	}

	const handleDislike = () => {
		setReactions(prev => {
			if (prev.isDisliked) {
				return {
					...prev,
					isDisliked: false,
					dislikes: prev.dislikes - 1,
				}
			} else {
				return {
					isDisliked: true,
					isLiked: false,
					dislikes: prev.dislikes + 1,
					likes: prev.isLiked ? prev.likes - 1 : prev.likes,
				}
			}
		})
	}

	return (
		<div className='bg-white rounded-4xl shadow-lg overflow-hidden relative'>
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
						{!productCount ? (
							<button
								className='w-full bg-orange-400 text-white py-3 px-6 rounded-4xl flex items-center justify-center gap-2 cursor-pointer'
								onClick={() => dispatch(addProduct(product))}
							>
								<GrBasket />
								Добавить в корзину
							</button>
						) : (
							<div className='flex gap-4 items-center'>
								<div
									className='bg-orange-400 py-1 px-6 rounded-4xl text-white flex justify-center items-center cursor-pointer'
									onClick={() => dispatch(addProduct(product))}
								>
									+
								</div>
								<p>{productCount}</p>
								<div
									className='bg-orange-400 py-1 px-6 rounded-4xl text-white  flex justify-center items-center cursor-pointer'
									onClick={() => dispatch(removeProduct(product.id))}
								>
									-
								</div>
							</div>
						)}
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
			{isFavorite.length === 0 ? (
				<CiHeart
					size={30}
					className='absolute top-4 right-4 text-orange-400 cursor-pointer'
					onClick={() => dispatch(addFavorite(product))}
				/>
			) : (
				<FaHeart
					size={25}
					className='absolute top-5 right-5 text-orange-400 cursor-pointer'
					onClick={() => dispatch(removeFavorite(product.id))}
				/>
			)}
			<div className='absolute bottom-4 right-4 flex gap-4'>
				<div className='flex gap-2 items-center'>
					<p>{reactions.dislikes}</p>
					<AiTwotoneDislike
						size={30}
						className={`cursor-pointer ${
							reactions.isDisliked ? 'text-red-500' : 'text-gray-400'
						}`}
						onClick={handleDislike}
					/>
				</div>
				<div className='flex gap-2 items-center'>
					<p>{reactions.likes}</p>
					<AiTwotoneLike
						size={30}
						className={`cursor-pointer ${
							reactions.isLiked ? 'text-green-500' : 'text-gray-400'
						}`}
						onClick={handleLike}
					/>
				</div>
			</div>
		</div>
	)
}
