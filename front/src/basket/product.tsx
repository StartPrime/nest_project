import { BasketState } from '../interfaces'
import { addProduct, removeProduct } from '../store/slices/basketReducer'
import { useDispatch } from 'react-redux'

interface Props {
	item: BasketState
}

export default function Product({ item }: Props) {
	const dispatch = useDispatch()

	return (
		<article className='bg-white rounded-4xl p-4 justify-between h-[200px] relative shadow'>
			<div className='flex gap-12 items-center h-full'>
				<div className='w-[30%] p-2'>
					<img
						src={item.product.imageUrl}
						alt={item.product.name}
						className='w-full h-full object-cover rounded-4xl'
					/>
				</div>
				<div className='flex flex-col gap-4'>
					<div>
						<p className='text-2xl'>{item.product.name}</p>
						<p className='text-orange-400'>{item.product.price} ₽</p>
					</div>
				</div>
			</div>
			<div className='flex gap-4 items-center absolute right-4 bottom-4'>
				<div
					className='bg-orange-400 py-1 px-6 rounded-4xl text-white 
				flex justify-center items-center cursor-pointer'
					onClick={() => dispatch(addProduct(item.product))}
				>
					+
				</div>
				<p>{item.count}</p>
				<div
					className='bg-orange-400 py-1 px-6 rounded-4xl text-white  
				flex justify-center items-center cursor-pointer'
					onClick={() => dispatch(removeProduct(item.product.id))}
				>
					-
				</div>
			</div>
		</article>
	)
}
