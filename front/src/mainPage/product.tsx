import { useNavigate } from 'react-router-dom'
import { Product as IProduct } from '../interfaces'

interface Props {
	product: IProduct
}

export default function Product({ product }: Props) {
	const navigate = useNavigate()

	return (
		<article
			className='xl:w-[32%] w-[48%] max-h-[410px] flex flex-col justify-between bg-white mb-4 px-4 py-6 rounded-4xl shadow cursor-pointer duration-200 hover:scale-102'
			onClick={() => {
				navigate(`/products/${product.id}`)
			}}
		>
			<div className='h-[70%] flex items-center justify-center'>
				<img
					src={product.imageUrl}
					alt={product.name}
					className='h-full w-full object-contain pointer-events-none'
				/>
			</div>
			<div className='flex justify-between sm:gap-4 sm:flex-row flex-col max-h-[30%]'>
				<h1 className='sm:text-[18px] text-sm font-medium'>{product.name}</h1>
				<p className='text-orange-400 font-medium text-nowrap sm:text-base text-xs'>
					{product.price} ₽
				</p>
			</div>
		</article>
	)
}
