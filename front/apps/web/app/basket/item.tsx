'use client'

import { Item as IItem, CartItem } from '@/interfaces'
import { FaRegTrashCan } from 'react-icons/fa6'
import { useBasket } from '@/store/basket'

interface Props {
	item: CartItem
}

export default function Item({ item }: Props) {
	const removeItem = useBasket(state => state.removeItem)
	const totalQuantity = useBasket(state => state.getTotalQuantity(item.id))
	const increaseQuantity = useBasket(state => state.increaseQuantity)
	const decreaseQuantity = useBasket(state => state.decreaseQuantity)

	return (
		<div className='w-full flex gap-12 items-center bg-white p-4 rounded-4xl shadow relative h-[270px]'>
			<div className='w-1/2 flex items-center justify-center'>
				<img src={item.image} alt={item.name} className='h-[250px] w-auto' />
			</div>
			<div className='w-1/2'>
				<p>{item.name}</p>
				<p>Количество: {item.quantity}</p>
				<div className='flex gap-2 items-center mt-2'>
					<p
						className='bg-gray-200 h-8 w-8 rounded-full flex items-center justify-center cursor-pointer'
						onClick={() => increaseQuantity(item.id)}
					>
						+
					</p>
					<p>{totalQuantity}</p>
					<p
						className='bg-gray-200 h-8 w-8 rounded-full flex items-center justify-center cursor-pointer'
						onClick={() => decreaseQuantity(item.id)}
					>
						-
					</p>
				</div>
			</div>
			<p className='text-primary absolute right-4 bottom-2'>{item.price} ₽</p>
			<FaRegTrashCan
				size={20}
				className='text-red-600 absolute top-4 right-4 cursor-pointer'
				onClick={() => removeItem(item.id)}
			/>
		</div>
	)
}
