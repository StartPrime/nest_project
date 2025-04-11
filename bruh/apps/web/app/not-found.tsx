'use client'

import Container from '@/components/container'
import { Button } from '@workspace/ui/components/button'
import { useRouter } from 'next/navigation'

export default function notFound() {
	const router = useRouter()

	return (
		<div>
			<Container classes='flex items-center justify-center flex-col'>
				<h1 className='text-9xl'>404</h1>
				<p className='w-150 text-center'>
					Запрошенная вами страница не существует или была перемещена.
					Пожалуйста, проверьте адрес или перейдите на главную страницу.
					Приносим извинения за доставленные неудобства.
				</p>
				<Button
					className='mt-4 cursor-pointer'
					onClick={() => router.push('/')}
				>
					На главную
				</Button>
			</Container>
		</div>
	)
}
