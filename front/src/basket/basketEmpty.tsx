import { useNavigate } from 'react-router-dom'
import Container from '../components/container'
import { TiShoppingCart } from 'react-icons/ti'

export default function BasketEmpty() {
	const navigate = useNavigate()

	return (
		<>
			<div className='mt-12'>
				<Container>
					<div className='flex flex-col items-center gap-4'>
						<TiShoppingCart size={500} className='text-orange-400' />
						<div className='text-center'>
							<p className='text-3xl font-medium'>Корзина пуста</p>
							<p className='opacity-50'>
								Но это никогда не поздно исправить :)
							</p>
						</div>
						<button
							className='bg-black w-1/3 p-2 rounded-lg text-white cursor-pointer'
							onClick={() => navigate('/')}
						>
							В каталог товаров
						</button>
					</div>
				</Container>
			</div>
		</>
	)
}
