import { useGetProductsQuery } from '../store/api/productsApi'
import Loader from '../components/loader'
import Container from '../components/container'
import Category from './category'
import { useEffect, useState } from 'react'

export default function Catalog() {
	const { data, isError, isLoading } = useGetProductsQuery()
	const [filteredData, setFilteredData] = useState(data)
	const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 })
	const [activePriceRange, setActivePriceRange] = useState({
		min: 0,
		max: 10000,
	})

	useEffect(() => {
		setFilteredData(data)
		if (data) {
			const allPrices = data.flatMap(category =>
				category.products.map(product => product.price)
			)
			const maxPrice = Math.max(...allPrices, 10000)
			setPriceRange(prev => ({ ...prev, max: maxPrice }))
			setActivePriceRange(prev => ({ ...prev, max: maxPrice }))
		}
	}, [data])

	const applyPriceFilter = () => {
		setFilteredData(prevData => {
			if (!prevData) return prevData

			return prevData
				.map(category => ({
					...category,
					products: category.products.filter(
						product =>
							product.price >= activePriceRange.min &&
							product.price <= activePriceRange.max
					),
				}))
				.filter(category => category.products.length > 0)
		})
	}

	const resetPriceFilter = () => {
		setActivePriceRange({ min: 0, max: priceRange.max })
		setFilteredData(data)
	}

	function sortPriceUp() {
		setFilteredData(prevData => {
			if (!prevData) return prevData

			return prevData.map(category => ({
				...category,
				products: [...category.products].sort((a, b) => a.price - b.price),
			}))
		})
	}

	function sortPriceDown() {
		setFilteredData(prevData => {
			if (!prevData) return prevData

			return prevData.map(category => ({
				...category,
				products: [...category.products].sort((a, b) => b.price - a.price),
			}))
		})
	}

	if (isLoading) {
		return (
			<Container classes='flex items-center justify-center mt-24'>
				<Loader />
			</Container>
		)
	}

	if (isError) {
		return (
			<Container classes='flex items-center justify-center mt-24'>
				<p className='text-red-600 text-2xl'>
					Произошла ошибка при получении товаров
				</p>
			</Container>
		)
	}

	return (
		<Container classes='mt-12'>
			<main>
				<div className='flex gap-4 items-center justify-end'>
					<div className='flex gap-4 items-center'>
						<p
							className='text-orange-400 cursor-pointer h-max'
							onClick={sortPriceUp}
						>
							Цена ↑
						</p>
						<p
							className='text-orange-400 cursor-pointer'
							onClick={sortPriceDown}
						>
							Цена ↓
						</p>
					</div>
					<div className='flex items-center gap-2'>
						<span>От:</span>
						<input
							type='number'
							value={activePriceRange.min}
							onChange={e =>
								setActivePriceRange({
									...activePriceRange,
									min: Math.max(0, Number(e.target.value)),
								})
							}
							className='border p-2 rounded w-24'
							min='0'
							max={activePriceRange.max}
						/>
					</div>

					<div className='flex items-center gap-2'>
						<span>До:</span>
						<input
							type='number'
							value={activePriceRange.max}
							onChange={e =>
								setActivePriceRange({
									...activePriceRange,
									max: Math.min(priceRange.max, Number(e.target.value)),
								})
							}
							className='border p-2 rounded w-24'
							min={activePriceRange.min}
							max={priceRange.max}
						/>
					</div>

					<button
						onClick={applyPriceFilter}
						className='px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500 cursor-pointer'
					>
						Применить
					</button>

					<button
						onClick={resetPriceFilter}
						className='px-4 py-2 bg-gray-400 rounded hover:bg-gray-300 cursor-pointer'
					>
						Сбросить
					</button>
				</div>

				{filteredData?.length ? (
					filteredData.map(category => (
						<Category category={category} key={category.categoryId} />
					))
				) : (
					<p className='text-center text-gray-500 py-8'>
						Товары не найдены. Попробуйте изменить параметры фильтра.
					</p>
				)}
			</main>
		</Container>
	)
}
