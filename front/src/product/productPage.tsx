import Header from '../components/header'
import Footer from '../components/footer'
import Product from './product'

export default function ProductPage() {
	return (
		<div className='min-h-screen flex flex-col'>
			<div className='flex-grow'>
				<Header />
				<Product />
			</div>
			<Footer />
		</div>
	)
}
