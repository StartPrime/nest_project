import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './mainPage/mainPage'
import ProductPage from './product/productPage'
import Header from './components/header'
import Footer from './components/footer'

export default function App() {
	return (
		<div className='bg-[rgb(234,234,234)] min-h-screen flex flex-col'>
			<div className='flex-grow'>
				<Header />
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<MainPage />} />
						<Route path='/products/:id' element={<ProductPage />} />
					</Routes>
				</BrowserRouter>
			</div>
			<Footer />
		</div>
	)
}
