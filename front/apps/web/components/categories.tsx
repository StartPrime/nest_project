'use client'

import { Category } from '@/interfaces'
import Container from './container'
import CategoryComponent from './category'
import { useState } from 'react'

interface Props {
	categories: Category[]
}

type SortOption = 'none' | 'price-asc' | 'price-desc'

export default function Categories({ categories: initialCategories }: Props) {
	const [selectedCategoryIds, setSelectedCategoryIds] = useState<Set<number>>(
		new Set(initialCategories.map(c => c.categoryId))
	)
	const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
	const [sortOption, setSortOption] = useState<SortOption>('none')

	const handleCategoryToggle = (categoryId: number) => {
		setSelectedCategoryIds(prev => {
			const newSelection = new Set(prev)
			if (newSelection.has(categoryId)) {
				newSelection.delete(categoryId)
			} else {
				newSelection.add(categoryId)
			}
			return newSelection
		})
	}

	const handlePriceChange = (index: number, value: number) => {
		setPriceRange(prev => {
			const newRange = [...prev] as [number, number]
			newRange[index] = value
			return newRange
		})
	}

	const handleSortChange = (option: SortOption) => {
		setSortOption(option)
	}

	const processCategories = () => {
		let result = initialCategories
			.filter(category => selectedCategoryIds.has(category.categoryId))
			.map(category => ({
				...category,
				products: category.products.filter(
					product =>
						product.price >= priceRange[0] && product.price <= priceRange[1]
				),
			}))
			.filter(category => category.products.length > 0)

		if (sortOption !== 'none') {
			result = result.map(category => ({
				...category,
				products: [...category.products].sort((a, b) =>
					sortOption === 'price-asc' ? a.price - b.price : b.price - a.price
				),
			}))
		}

		return result
	}

	const filteredCategories = processCategories()

	return (
		<main className='flex-1 mt-8'>
			<Container>
				<div className='w-full p-4 bg-white rounded-4xl mb-6'>
					<h3 className='font-bold mb-4'>Фильтры</h3>

					<div className='mb-6'>
						<h4 className='text-sm font-medium mb-2'>Категории</h4>
						<div className='flex flex-wrap gap-4'>
							{initialCategories.map(category => (
								<label
									key={category.categoryId}
									className='flex items-center space-x-2 cursor-pointer'
								>
									<input
										type='checkbox'
										checked={selectedCategoryIds.has(category.categoryId)}
										onChange={() => handleCategoryToggle(category.categoryId)}
										className='h-5 w-5 accent-primary border-white rounded-4xl checked:bg-primary checked:border-primary'
									/>
									<span>{category.categoryName}</span>
								</label>
							))}
						</div>
					</div>

					<div className='mb-6'>
						<h4 className='text-sm font-medium mb-2'>Ценовой диапазон</h4>
						<div className='flex items-center gap-4'>
							<input
								type='number'
								value={priceRange[0]}
								onChange={e => handlePriceChange(0, Number(e.target.value))}
								className='w-24 p-2 border rounded-lg'
								placeholder='От'
								min='0'
							/>
							<span>-</span>
							<input
								type='number'
								value={priceRange[1]}
								onChange={e => handlePriceChange(1, Number(e.target.value))}
								className='w-24 p-2 border rounded-lg'
								placeholder='До'
								min={priceRange[0]}
							/>
						</div>
					</div>

					<div>
						<h4 className='text-sm font-medium mb-2'>Сортировка</h4>
						<div className='flex gap-4'>
							<button
								onClick={() => handleSortChange('none')}
								className={`px-4 py-2 rounded-lg cursor-pointer ${sortOption === 'none' ? 'bg-primary text-white' : 'bg-gray-200'}`}
							>
								По умолчанию
							</button>
							<button
								onClick={() => handleSortChange('price-asc')}
								className={`px-4 py-2 rounded-lg cursor-pointer ${sortOption === 'price-asc' ? 'bg-primary text-white' : 'bg-gray-200'}`}
							>
								По возрастанию цены
							</button>
							<button
								onClick={() => handleSortChange('price-desc')}
								className={`px-4 py-2 rounded-lg cursor-pointer ${sortOption === 'price-desc' ? 'bg-primary text-white' : 'bg-gray-200'}`}
							>
								По убыванию цены
							</button>
						</div>
					</div>
				</div>

				{filteredCategories.map(category => (
					<div className='mt-6' key={category.categoryId}>
						<CategoryComponent category={category} />
					</div>
				))}
			</Container>
		</main>
	)
}
