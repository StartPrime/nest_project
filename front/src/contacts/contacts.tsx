import { useNavigate } from 'react-router-dom'
import Container from '../components/container'
import Map from './map'
import { FaInstagram, FaTelegram, FaWhatsapp, FaVk } from 'react-icons/fa'
import { FaArrowLeftLong, FaPhone } from 'react-icons/fa6'

export default function Contacts() {
	const navigate = useNavigate()

	return (
		<section className='mt-12'>
			<Container>
				<h1 className='text-3xl font-bold mb-4'>Наш офис</h1>
				<div
					className='flex gap-2 items-center mb-4 duration-200 hover:scale-105 cursor-pointer w-max'
					onClick={() => {
						navigate(-1)
					}}
				>
					<FaArrowLeftLong />
					<p>Назад</p>
				</div>
				<div className='flex justify-between lg:flex-row flex-col'>
					<div className='lg:w-5/6'>
						<Map />
					</div>
					<div>
						<div className='flex lg:flex-col gap-2 max-lg:mt-8'>
							<div className='bg-white p-4 rounded-3xl cursor-pointer w-max'>
								<FaInstagram size={40} className='max-sm:size-7' />
							</div>
							<div className='bg-white p-4 rounded-3xl cursor-pointer w-max'>
								<FaTelegram size={40} className='max-sm:size-7' />
							</div>
							<div className='bg-white p-4 rounded-3xl cursor-pointer w-max'>
								<FaWhatsapp size={40} className='max-sm:size-7' />
							</div>
							<div className='bg-white p-4 rounded-3xl cursor-pointer w-max'>
								<FaVk size={40} className='max-sm:size-7' />
							</div>
						</div>
					</div>
				</div>
				<div className='flex my-8 items-center gap-4'>
					<FaPhone size={30} />
					<p className='lg:text-4xl text-2xl font-bold'>+7 777 777 77 77</p>
				</div>
			</Container>
		</section>
	)
}
