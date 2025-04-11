export interface Item {
	id: number
	name: string
	price: number
	brand: string
	color: string
	description: string
	image: string
}

export interface Category {
	categoryName: string
	categoryId: number
	products: Item[]
}

export interface CartItem extends Item {
	quantity: number
}
