import Container from '../components/container'

export default function Banner() {
	return (
		<Container>
			<article className='min-[760px]:h-[200px] bg-black rounded-4xl flex mt-12 px-2'>
				<div className='flex w-[50%] justify-center items-center'>
					<p className='text-white min-[840px]:text-2xl max-sm:text-xs font-bold text-center'>
						Широкий выбор техники Apple
					</p>
				</div>
				<div className='flex w-[50%] justify-center '>
					<img
						src='/banner.jpg'
						alt='banner'
						className='pointer-events-none h-full w-full object-contain rounded-4xl'
					/>
				</div>
			</article>
		</Container>
	)
}
