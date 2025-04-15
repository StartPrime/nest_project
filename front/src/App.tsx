import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './mainPage/mainPage'
import ProductPage from './product/productPage'
import Header from './components/header'
import Footer from './components/footer'
import Favorites from './favorites/favoritesContainer'

export default function App() {
	return (
		<div className='bg-[rgb(234,234,234)] min-h-screen flex flex-col'>
			<div className='flex-grow'>
				<BrowserRouter>
					<Header />
					<Routes>
						<Route path='/' element={<MainPage />} />
						<Route path='/products/:id' element={<ProductPage />} />
						<Route path='/favorites' element={<Favorites />} />
					</Routes>
				</BrowserRouter>
			</div>
			<Footer />
		</div>
	)
}
