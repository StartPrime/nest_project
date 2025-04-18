import { RefObject, useState } from 'react'
import Login from './login'
import Register from './register'
import { RxCross2 } from 'react-icons/rx'

interface Props {
	dialogRef: RefObject<HTMLDialogElement | null>
}

export default function Auth({ dialogRef }: Props) {
	const [isLogin, setIsLogin] = useState(true)

	return (
		<dialog
			ref={dialogRef}
			className='rounded-2xl shadow m-auto backdrop:bg-gray-900/50 w-[360px] outline-none'
		>
			<div className='w-full max-w-md p-8 space-y-6 bg-white rounded-lg relative'>
				{isLogin ? (
					<Login dialogRef={dialogRef} />
				) : (
					<Register dialogRef={dialogRef} />
				)}
				<div className='text-sm text-center text-gray-600'>
					{isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
					<button
						onClick={() => setIsLogin(!isLogin)}
						className='font-medium text-orange-400 hover:text-orange-500 focus:outline-none cursor-pointer'
					>
						{isLogin ? 'Зарегистрироваться' : 'Войти'}
					</button>
				</div>
				<RxCross2
					size={20}
					className='absolute top-4 right-4 cursor-pointer'
					onClick={() => dialogRef.current?.close()}
				/>
			</div>
		</dialog>
	)
}
