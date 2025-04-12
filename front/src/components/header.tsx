import Container from './container'
import { FaRegHeart } from 'react-icons/fa'
import { GrBasket } from 'react-icons/gr'
import { CgProfile } from 'react-icons/cg'
import { useRef } from 'react'
import Auth from './auth/auth'

export default function Header() {
	const dialogRef = useRef<HTMLDialogElement | null>(null)

	return (
		<header>
			<Container>
				<div className='flex justify-between pt-4'>
					<h1 className='sm:text-4xl text-2xl font-bold'>QPICK</h1>
					<div className='flex gap-8 items-center'>
						<button
							className='outline-none flex items-center gap-2 bg-orange-400 text-white py-2 px-4 rounded-4xl shadow cursor-pointer hover:bg-orange-500 duration-200'
							onClick={() => {
								dialogRef?.current?.showModal()
							}}
						>
							<CgProfile size={20} />
							Войти
						</button>
						<div className='relative cursor-pointer'>
							<FaRegHeart size={30} />
							<p className='absolute top-0 -right-3 z-10 text-white bg-orange-400 rounded-full w-6 h-6 flex items-center justify-center text-xs'>
								10
							</p>
						</div>
						<div className='relative cursor-pointer'>
							<GrBasket size={30} />
							<p className='absolute top-0 -right-3 z-10 text-white bg-orange-400 rounded-full w-6 h-6 flex items-center justify-center text-xs'>
								1
							</p>
						</div>
					</div>
				</div>
			</Container>
			<Auth dialogRef={dialogRef} />
		</header>
	)
}
