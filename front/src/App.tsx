import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './mainPage/mainPage'
import ProductPage from './product/productPage'

export default function App() {
	return (
		<div className='bg-[rgb(234,234,234)] min-h-screen'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<MainPage />} />
					<Route path='/products/:id' element={<ProductPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}
