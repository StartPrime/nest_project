import { useNavigate } from 'react-router-dom'
import { BasketState } from '../interfaces'
import { addProduct, removeProduct } from '../store/slices/basketReducer'
import { useDispatch } from 'react-redux'

interface Props {
	item: BasketState
}

export default function Product({ item }: Props) {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	return (
		<article
			className='bg-white rounded-4xl p-4 justify-between h-[200px] relative shadow cursor-pointer'
			onClick={() => navigate(`/products/${item.product.id}`)}
		>
			<div className='flex gap-8 items-center h-full'>
				<div className='sm:w-1/3 w-1/2 h-full'>
					<img
						className='w-full h-full object-contain rounded-4xl'
						src={item.product.imageUrl}
						alt={item.product.name}
					/>
				</div>
				<div className='flex flex-col gap-4'>
					<div>
						<p className='sm:text-2xl font-medium'>{item.product.name}</p>
						<p className='text-orange-400'>{item.product.price} ₽</p>
					</div>
				</div>
			</div>
			<div className='flex gap-4 items-center absolute right-4 bottom-4'>
				<div
					className='bg-orange-400 py-1 px-6 rounded-4xl text-white 
				flex justify-center items-center cursor-pointer'
					onClick={event => {
						dispatch(addProduct(item.product))
						event.stopPropagation()
					}}
				>
					+
				</div>
				<p>{item.count}</p>
				<div
					className='bg-orange-400 py-1 px-6 rounded-4xl text-white  
				flex justify-center items-center cursor-pointer'
					onClick={event => {
						dispatch(removeProduct(item.product.id))
						event.stopPropagation()
					}}
				>
					-
				</div>
			</div>
		</article>
	)
}
