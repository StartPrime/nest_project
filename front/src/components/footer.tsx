import { useNavigate } from 'react-router-dom'
import Container from './container'

import { FaInstagram, FaTelegram, FaWhatsapp, FaVk } from 'react-icons/fa'

export default function Footer() {
	const navigate = useNavigate()

	return (
		<footer>
			<Container>
				<div className='bg-white flex justify-between p-4 rounded-t-4xl gap-8'>
					<p className='sm:text-2xl font-bold'>QPICK</p>
					<nav className='flex flex-col gap-2 sm:text-[18px] text-xs'>
						<p
							className='cursor-pointer'
							onClick={() => navigate('/favorites')}
						>
							Избранное
						</p>
						<p className='cursor-pointer' onClick={() => navigate('/basket')}>
							Корзина
						</p>
						<p className='cursor-pointer'>Контакты</p>
					</nav>
					<div className='flex gap-4 flex-wrap'>
						<FaVk className='cursor-pointer sm:size-7 size-5' />
						<FaInstagram className='cursor-pointer sm:size-7 size-5' />
						<FaTelegram className='cursor-pointer sm:size-7 size-5' />
						<FaWhatsapp className='cursor-pointer sm:size-7 size-5' />
					</div>
				</div>
			</Container>
		</footer>
	)
}
