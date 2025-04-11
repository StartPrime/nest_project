'use client'

import { useRouter } from 'next/navigation'
import Container from './container'
import { SlBasket } from 'react-icons/sl'
import { useBasket } from '../store/basket'
import dynamic from 'next/dynamic'

const Header = () => {
	const router = useRouter()
	const count = useBasket(state => state.getTotalItems())

	return (
		<header className='sticky top-2 z-10'>
			<Container>
				<div className='flex justify-between mt-6'>
					<p
						className='text-2xl font-bold cursor-pointer'
						onClick={() => router.push('/')}
					>
						QPICK
					</p>
					<div
						className='flex gap-2 items-center cursor-pointer'
						onClick={() => router.push('/basket')}
					>
						<SlBasket size={35} className='text-primary' />
						<p className='text-white bg-primary flex justify-center items-center p-2 w-14 rounded-2xl'>
							{count}
						</p>
					</div>
				</div>
			</Container>
		</header>
	)
}

export default dynamic(() => Promise.resolve(Header), { ssr: false })
