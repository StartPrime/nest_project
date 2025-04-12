import Footer from '../components/footer'
import Header from '../components/header'
import Banner from './banner'
import Catalog from './catalog'

export default function MainPage() {
	return (
		<>
			<div className='min-h-screen flex flex-col'>
				<div className='flex-grow'>
					<Header />
					<Banner />
					<Catalog />
				</div>
				<Footer />
			</div>
		</>
	)
}
