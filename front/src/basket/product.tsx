import { BasketState } from '../interfaces'

interface Props {
	item: BasketState
}

export default function Product({ item }: Props) {
	return (
		<article className='bg-white rounded-4xl h-[250px] p-4 justify-between'>
			<div className='flex gap-12 items-center h-full'>
				<img
					src={item.product.imageUrl}
					alt={item.product.name}
					className='rounded-4xl w-[30%] h-auto'
				/>
				<div className='flex flex-col gap-4'>
					<div>
						<p>{item.product.name}</p>
						<p>{item.product.price} ₽</p>
					</div>
				</div>
			</div>
			<div className='flex gap-4 items-center'>
				<div className='bg-orange-400 py-1 px-6 rounded-4xl text-white flex justify-center items-center cursor-pointer'>
					+
				</div>
				<p>{12}</p>
				<div className='bg-orange-400 py-1 px-6 rounded-4xl text-white  flex justify-center items-center cursor-pointer'>
					-
				</div>
			</div>
		</article>
	)
}
