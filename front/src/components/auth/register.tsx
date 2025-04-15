import { useForm } from 'react-hook-form'
import { RegisterData } from '../../interfaces'
import { useRegisterMutation } from '../../store/api/authApi'
import { isErrorWithMessage } from '../../utils/isErrorWithMessage'
import { RefObject, useState } from 'react'

interface Props {
	dialogRef: RefObject<HTMLDialogElement | null>
}

export default function Register({ dialogRef }: Props) {
	const {
		register: reg,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm<RegisterData>({ mode: 'onBlur' })

	const [register] = useRegisterMutation()

	const [error, setError] = useState<string | null>(null)

	async function onSubmit(data: RegisterData) {
		setError(null)
		try {
			await register(data).unwrap()
			reset()
			dialogRef.current?.close()
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
				<h1 className='text-2xl font-bold text-gray-900'>Регистрация</h1>
				<p className='mt-2 text-sm text-gray-600'>Создайте новый аккаунт</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className='mt-8 space-y-6'>
				<div>
					<label
						htmlFor='name'
						className='block text-sm font-medium text-gray-700'
					>
						Имя
					</label>
					<div className='mt-1'>
						<input
							id='name'
							type='name'
							autoComplete='name'
							className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
								errors?.name ? 'border-red-300' : 'border-gray-300'
							}`}
							{...reg('name', {
								required: 'Поле обязательно для заполнения',
							})}
						/>
						{errors?.name && (
							<p className='mt-1 text-sm text-red-600'>{errors.name.message}</p>
						)}
					</div>
				</div>
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
							autoComplete='new-password'
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
						Зарегистрироваться
					</button>
					{error && (
						<p className='text-center text-sm mt-2 text-red-600'>{error}</p>
					)}
				</div>
			</form>
		</>
	)
}
