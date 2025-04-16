import Container from '../components/container'
import Product from './product'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { selectBasketTotalPrice } from '../store/slices/basketReducer'

export default function Basket() {
	const products = useSelector(
		(state: RootState) => state.persistedReducer.basket.products
	)

	const totalPrice = useSelector(selectBasketTotalPrice)

	return (
		<section className='mt-12'>
			<Container>
				<h1 className='text-4xl font-bold'>Корзина</h1>
				<div className='flex justify-between mt-4'>
					<div className='w-[48%] flex flex-col gap-4'>
						{products.map((item, index) => (
							<Product key={index} item={item} />
						))}
					</div>
					<div className='w-[48%] bg-white rounded-4xl h-max'>
						<div className='flex justify-between p-4'>
							<p className='font-bold'>ИТОГО</p>
							<p className='text-orange-400 text-2xl'>{totalPrice} ₽</p>
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
