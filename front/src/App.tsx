import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './mainPage/mainPage'
import ProductPage from './product/productPage'
import Header from './components/header'
import Footer from './components/footer'
import Favorites from './favorites/favoritesContainer'
import Basket from './basket/basket'

export default function App() {
	return (
		<BrowserRouter>
			<div className='bg-[rgb(234,234,234)] min-h-screen flex flex-col'>
				<div className='flex-grow'>
					<Header />
					<Routes>
						<Route path='/' element={<MainPage />} />
						<Route path='/products/:id' element={<ProductPage />} />
						<Route path='/favorites' element={<Favorites />} />
						<Route path='/basket' element={<Basket />} />
					</Routes>
				</div>
				<Footer />
			</div>
		</BrowserRouter>
	)
}
