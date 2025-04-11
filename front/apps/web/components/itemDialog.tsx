'use client'

import { RefObject } from 'react'
import { Item } from '@/interfaces'
import { Button } from '@workspace/ui/components/button'
import { RxCross2 } from 'react-icons/rx'
import { useBasket } from '@/store/basket'
import { it } from 'node:test'

interface Props {
	dialogRef: RefObject<HTMLDialogElement | null>
	item: Item
}

export default function ItemDialog({ dialogRef, item }: Props) {
	const addItem = useBasket(state => state.addItem)
	return (
		<dialog ref={dialogRef} className='m-auto outline-none rounded-4xl p-4'>
			<div className='flex h-[600px] flex-col relative'>
				<div className='h-[60%] flex items-center justify-center'>
					<img src={item.image} alt={item.name} className='h-full w-auto' />
				</div>
				<div className='w-full px-4 flex flex-col justify-between h-[40%] pt-4'>
					<div>
						<h1 className='text-2xl font-bold'>{item.name}</h1>
						<p>Брэнд: {item.brand}</p>
						<p>Цвет: {item.color}</p>
						<p>{item.description}</p>
					</div>
					<div className='flex justify-between'>
						<Button
							className='w-[60%] cursor-pointer rounded-4xl'
							onClick={() => {
								addItem(item)
								if (dialogRef.current) {
									dialogRef.current.close()
								}
							}}
						>
							Заказать
						</Button>
						<p className='text-primary'>{item.price} ₽</p>
					</div>
				</div>
				<RxCross2
					size={30}
					className='absolute top-0 right-0 cursor-pointer'
					onClick={() => {
						if (dialogRef.current) {
							dialogRef.current.close()
						}
					}}
				/>
			</div>
		</dialog>
	)
}
