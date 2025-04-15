import { useForm } from 'react-hook-form'
import { LoginData } from '../../interfaces'
import { useLoginMutation } from '../../store/api/authApi'
import { isErrorWithMessage } from '../../utils/isErrorWithMessage'
import { RefObject, useState } from 'react'

interface Props {
	dialogRef: RefObject<HTMLDialogElement | null>
}

export default function Login({ dialogRef }: Props) {
	const {
		register: reg,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm<LoginData>({ mode: 'onBlur' })

	const [error, setError] = useState<string | null>(null)

	const [login] = useLoginMutation()

	async function onSubmit(data: LoginData) {
		setError(null)
		try {
			await login(data).unwrap()
			dialogRef.current?.close()
			reset()
		} catch (error) {
			if (isErrorWithMessage(error)) {
				setError(error.data.message)
			} else {
				setError('Произошла неизвестная ошибка')
			}
		}
	}

	return (
		<>
			<div className='text-center'>
				<h1 className='text-2xl font-bold text-gray-900'>Вход в систему</h1>
				<p className='mt-2 text-sm text-gray-600'>
					Введите свои данные для доступа к аккаунту
				</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className='mt-8 space-y-6'>
				<div>
					<label
						htmlFor='email'
						className='block text-sm font-medium text-gray-700'
					>
						Электронная почта
					</label>
					<div className='mt-1'>
						<input
							id='email'
							type='email'
							autoComplete='email'
							className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
								errors?.email ? 'border-red-300' : 'border-gray-300'
							}`}
							{...reg('email', {
								required: 'Поле обязательно для заполнения',
								pattern: {
									value: /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
									message: 'Некорректный адрес',
								},
							})}
						/>
						{errors?.email && (
							<p className='mt-1 text-sm text-red-600'>
								{errors.email.message}
							</p>
						)}
					</div>
				</div>

				<div>
					<label
						htmlFor='password'
						className='block text-sm font-medium text-gray-700'
					>
						Пароль
					</label>
					<div className='mt-1'>
						<input
							id='password'
							type='password'
							autoComplete='current-password'
							className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
								errors?.password ? 'border-red-300' : 'border-gray-300'
							}`}
							{...reg('password', {
								required: 'Поле обязательно для заполнения',
								minLength: {
									value: 8,
									message: 'Минимальная длина 8 символов',
								},
							})}
						/>
						{errors?.password && (
							<p className='mt-1 text-sm text-red-600'>
								{errors.password.message}
							</p>
						)}
					</div>
				</div>

				<div className='flex items-center justify-between gap-2'>
					<div className='flex items-center'>
						<input
							id='remember-me'
							name='remember-me'
							type='checkbox'
							className='w-4 h-4 text-orange-400 border-gray-300 rounded focus:ring-orange-400'
						/>
						<label
							htmlFor='remember-me'
							className='block ml-2 text-sm text-gray-900'
						>
							Запомнить меня
						</label>
					</div>

					<div className='text-sm'>
						<a
							href='#'
							className='font-medium text-orange-400 hover:text-orange-500'
						>
							Забыли пароль?
						</a>
					</div>
				</div>

				<div>
					<button
						type='submit'
						disabled={!isValid}
						className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
							isValid
								? 'bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer'
								: 'bg-gray-400 cursor-not-allowed'
						}`}
					>
						Войти
					</button>
					{error && (
						<p className='text-center text-sm mt-2 text-red-600'>{error}</p>
					)}
				</div>
			</form>
		</>
	)
}
