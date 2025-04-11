import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Item } from '@/interfaces'
import { CartItem } from '@/interfaces'

interface CartState {
	items: CartItem[]
	addItem: (item: Item) => void
	removeItem: (itemId: number) => void
	getTotalItems: () => number
	getTotalPrice: () => number
	getTotalQuantity: (itemId: number) => number
	increaseQuantity: (itemId: number) => void
	decreaseQuantity: (itemId: number) => void
}

export const useBasket = create(
	persist<CartState>(
		(set, get) => ({
			items: [],
			addItem: item => {
				const currentItems = get().items
				const existingItem = currentItems.find(i => i.id === item.id)

				if (existingItem) {
					set({
						items: currentItems.map(i =>
							i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
						),
					})
				} else {
					set({ items: [...currentItems, { ...item, quantity: 1 }] })
				}
			},

			removeItem: itemId => {
				set({
					items: get().items.filter(item => item.id !== itemId),
				})
			},

			getTotalItems: () => {
				return get().items.reduce((total, item) => total + item.quantity, 0)
			},

			getTotalQuantity: itemId => {
				const item = get().items.find(item => item.id === itemId)
				return item ? item.quantity : 0
			},

			getTotalPrice: () => {
				return get().items.reduce(
					(total, item) => total + item.price * item.quantity,
					0
				)
			},

			increaseQuantity: itemId => {
				const currentItems = get().items
				set({
					items: currentItems.map(item =>
						item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
					),
				})
			},

			decreaseQuantity: itemId => {
				const currentItems = get().items
				set({
					items: currentItems.map(item =>
						item.id === itemId
							? {
									...item,
									quantity: item.quantity > 1 ? item.quantity - 1 : 1,
								}
							: item
					),
				})
			},
		}),
		{
			name: 'basket-storage',
		}
	)
)
