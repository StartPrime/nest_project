import Container from './container'
import { SlSocialVkontakte } from 'react-icons/sl'
import { FaInstagram } from 'react-icons/fa'
import { FaTelegramPlane } from 'react-icons/fa'
import { FaWhatsapp } from 'react-icons/fa'

export default function Footer() {
	return (
		<footer>
			<Container>
				<div className='mt-4 flex justify-between bg-white rounded-t-4xl px-6 pt-6 pb-8'>
					<p className='text-2xl font-bold'>QPICK</p>
					<nav className='flex flex-col gap-2'>
						<p className='cursor-pointer'>Избранное</p>
						<p className='cursor-pointer'>Корзина</p>
						<p className='cursor-pointer'>Контакты</p>
					</nav>
					<div>
						<p className='cursor-pointer'>Условия сервиса</p>
					</div>
					<div className='flex gap-4'>
						<SlSocialVkontakte size={30} className='cursor-pointer' />
						<FaInstagram size={30} className='cursor-pointer' />
						<FaTelegramPlane size={30} className='cursor-pointer' />
						<FaWhatsapp size={30} className='cursor-pointer' />
					</div>
				</div>
			</Container>
		</footer>
	)
}
