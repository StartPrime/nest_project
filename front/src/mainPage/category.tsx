import { Category as ICategory } from '../interfaces'
import Product from './product'

interface Props {
	category: ICategory
}

export default function Category({ category }: Props) {
	return (
		<section>
			<h1 className='text-3xl font-bold'>{category.categoryName}</h1>
			<div className='flex flex-wrap gap-[2%] my-4 justify-between'>
				{category.products.map(product => (
					<Product product={product} key={product.id} />
				))}
			</div>
		</section>
	)
}
