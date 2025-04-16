import Container from './container'
import { FaRegHeart } from 'react-icons/fa'
import { GrBasket } from 'react-icons/gr'
import { CgProfile } from 'react-icons/cg'
import { useRef } from 'react'
import Auth from './auth/auth'
import { useGetUserDataQuery } from '../store/api/userApi'
import { IoExitOutline } from 'react-icons/io5'
import { useLogoutMutation } from '../store/api/authApi'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { useNavigate } from 'react-router-dom'
import { selectBasketTotalItems } from '../store/slices/basketReducer'

export default function Header() {
	const dialogRef = useRef<HTMLDialogElement | null>(null)

	const { data, isLoading } = useGetUserDataQuery()
	const userName = data?.name

	const [logout] = useLogoutMutation(undefined)

	const navigate = useNavigate()

	const favoritesCount = useSelector(
		(state: RootState) => state.persistedReducer.favorites.products.length
	)

	const basketCount = useSelector(selectBasketTotalItems)

	const handleLogout = async () => {
		const res = confirm('Вы действительно хотите выйти из аккаунта?')
		if (!res) return
		try {
			await logout().unwrap()
		} catch {
			alert('Произошла ошибка при выходе из аккаунта, повторите позже')
		}
	}

	return (
		<header>
			<Container>
				<div className='flex justify-between pt-4'>
					<h1
						className='sm:text-4xl text-2xl font-bold cursor-pointer'
						onClick={() => navigate('/')}
					>
						QPICK
					</h1>
					<div className='flex gap-8 items-center'>
						{isLoading ? (
							<div className='animate-pulse bg-gray-200 w-24 h-10 rounded-full' />
						) : !userName ? (
							<button
								className='outline-none flex items-center gap-2 bg-orange-400 text-white py-2 px-4 rounded-4xl shadow cursor-pointer hover:bg-orange-500 duration-200'
								onClick={() => {
									dialogRef?.current?.showModal()
								}}
							>
								<CgProfile size={20} />
								Войти
							</button>
						) : (
							<div className='flex items-center gap-2 text-orange-400'>
								<CgProfile size={20} />
								<p>{userName}</p>
								<IoExitOutline
									size={20}
									className='text-red-600 cursor-pointer'
									onClick={handleLogout}
								/>
							</div>
						)}
						<div
							className='relative cursor-pointer'
							onClick={() => navigate('/favorites')}
						>
							<FaRegHeart size={30} />
							{favoritesCount > 0 && (
								<p
									className='absolute top-0 -right-3 z-10 text-white bg-orange-400 rounded-full w-6 h-6 flex 
								items-center justify-center text-xs'
								>
									{favoritesCount}
								</p>
							)}
						</div>
						<div
							className='relative cursor-pointer'
							onClick={() => navigate('/basket')}
						>
							<GrBasket size={30} />
							{basketCount > 0 && (
								<p className='absolute top-0 -right-3 z-10 text-white bg-orange-400 rounded-full w-6 h-6 flex items-center justify-center text-xs'>
									{basketCount}
								</p>
							)}
						</div>
					</div>
				</div>
			</Container>
			<Auth dialogRef={dialogRef} />
		</header>
	)
}
