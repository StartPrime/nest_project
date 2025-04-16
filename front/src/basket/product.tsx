import { Product as IProduct } from '../interfaces'

interface Props {
	product: IProduct
}

export default function Product({ product }: Props) {
	return (
		<article>
			<h1>{product.name}</h1>
		</article>
	)
}
