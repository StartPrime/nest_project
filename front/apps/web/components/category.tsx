import { Category as ICategory } from '@/interfaces'
import Item from './item'

interface Props {
	category: ICategory
}

export default function Category({ category }: Props) {
	return (
		<>
			<section>
				<h1 className='opacity-50'>{category.categoryName}</h1>
				<div className='flex justify-between flex-wrap gap-[30px] mt-4'>
					{category.products.map(item => (
						<Item key={item.id} item={item}></Item>
					))}
				</div>
			</section>
		</>
	)
}
