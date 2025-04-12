export interface Product {
	id: number
	name: string
	price: number
	brand: string
	color: string
	description: string
	imageUrl: string
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
