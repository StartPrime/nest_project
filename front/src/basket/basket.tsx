import Container from '../components/container'
import Product from './product'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { selectBasketTotalPrice } from '../store/slices/basketReducer'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

export default function Basket() {
	const products = useSelector(
		(state: RootState) => state.persistedReducer.basket.products
	)

	const totalPrice = useSelector(selectBasketTotalPrice)

	const navigate = useNavigate()

	return (
		<section className='my-12'>
			<Container>
				<h1 className='text-3xl font-bold'>
					Корзина {products.length < 1 && 'пуста'}
				</h1>
				<div
					className='mt-8 flex gap-2 items-center mb-4 duration-200 hover:scale-105 cursor-pointer w-max'
					onClick={() => {
						navigate(-1)
					}}
				>
					<FaArrowLeftLong />
					<p>Назад</p>
				</div>
				<div className='flex justify-between mt-4 sm:flex-row flex-col'>
					<div className='w-[60%] flex flex-col gap-4'>
						{products.map((item, index) => (
							<Product key={index} item={item} />
						))}
					</div>
					<div className='w-[35%] bg-white rounded-4xl h-max shadow'>
						<div className='flex justify-between p-4'>
							<p className='font-bold'>ИТОГО</p>
							<p className='text-orange-400 text-2xl font-medium'>
								{totalPrice} ₽
							</p>
						</div>
						<button className='w-full bg-black text-white py-4 rounded-2xl cursor-pointer hover:bg-gray-900'>
							Перейти к оформлению
						</button>
					</div>
				</div>
			</Container>
		</section>
	)
}
