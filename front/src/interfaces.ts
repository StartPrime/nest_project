export interface Product {
	id: number
	name: string
	price: number
	brand: string
	color: string
	description: string
	imageUrl: string
	likes: number
	dislikes: number
}

export interface Category {
	categoryName: string
	categoryId: number
	products: Product[]
}

export interface LoginData {
	email: string
	password: string
}

export interface RegisterData {
	name: string
	email: string
	password: string
}

export interface UserData {
	name: string
	email: string
}

export interface BasketState {
	product: Product
	count: number
}
