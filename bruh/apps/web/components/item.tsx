'use client'
import { useRef } from 'react'
import { Item as IItem } from '@/interfaces'
import { Button } from '@workspace/ui/components/button'
import ItemDialog from './itemDialog'

interface Props {
	item: IItem
}

export default function Item({ item }: Props) {
	const refDialog = useRef<HTMLDialogElement | null>(null)

	function openDialog() {
		if (refDialog.current) {
			refDialog.current.showModal()
		}
	}

	return (
		<article className='w-[350px] bg-white flex flex-col items-center h-[410px] justify-between p-4 rounded-4xl shadow'>
			<img
				src={item.image}
				alt={item.name}
				className='h-[80%] w-auto cursor-pointer select-none'
				onClick={openDialog}
			/>
			<div className='flex justify-between w-full'>
				<h1>{item.name}</h1>
				<p className='text-primary'>{item.price} ₽</p>
			</div>
			<Button
				className='w-full rounded-4xl cursor-pointer'
				onClick={openDialog}
			>
				Заказать
			</Button>
			<ItemDialog dialogRef={refDialog} item={item} />
		</article>
	)
}
