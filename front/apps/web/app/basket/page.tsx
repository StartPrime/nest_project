'use client'

import { useBasket } from '@/store/basket'
import Item from './item'
import Container from '@/components/container'
import { Button } from '@workspace/ui/components/button'
import dynamic from 'next/dynamic'

const Basket = () => {
	const items = useBasket(state => state.items)
	const totalPrice = useBasket(state => state.getTotalPrice())

	return (
		<section className='flex-1 mt-12'>
			<Container classes='mt-0'>
				<div className='flex w-full justify-between gap-4'>
					<div className='flex flex-col gap-4 w-1/2'>
						{items.map((item, index) => (
							<Item key={index} item={item}></Item>
						))}
					</div>
					<article className='bg-white rounded-4xl w-[30%] h-max'>
						<div className='flex justify-between font-bold p-4	'>
							<h1>ИТОГО</h1>
							<p>{totalPrice} ₽</p>
						</div>
						<Button className='bg-black w-full rounded-2xl h-14 cursor-pointer hover:bg-gray-900'>
							Перейти к оформлению
						</Button>
					</article>
				</div>
			</Container>
		</section>
	)
}

export default dynamic(() => Promise.resolve(Basket), { ssr: false })
