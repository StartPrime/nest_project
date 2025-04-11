import Categories from '@/components/categories'
const testData = [
	{
		categoryName: 'Наушники',
		categoryId: 1,
		products: [
			{
				id: 101,
				name: 'Беспроводные наушники X200',
				price: 4999,
				brand: 'SoundMaster',
				color: 'Чёрный',
				description: 'Шумоподавление, время работы 24 часа',
				image: '/naushniki.jpg',
			},
			{
				id: 102,
				name: 'Спорные накладные наушники',
				price: 2999,
				brand: 'AudioSport',
				color: 'Красный',
				description: 'Водостойкие, складная конструкция',
				image: '/naushniki.jpg',
			},
			{
				id: 103,
				name: 'Спорные накладные наушники',
				price: 2999,
				brand: 'AudioSport',
				color: 'Красный',
				description: 'Водостойкие, складная конструкция',
				image: '/naushniki.jpg',
			},
			{
				id: 104,
				name: 'Спорные накладные наушники',
				price: 2999,
				brand: 'AudioSport',
				color: 'Красный',
				description: 'Водостойкие, складная конструкция',
				image: '/naushniki.jpg',
			},
		],
	},
	{
		categoryName: 'Чехлы для телефона',
		categoryId: 2,
		products: [
			{
				id: 201,
				name: 'Чехол для iPhone 12',
				price: 1299,
				brand: 'CasePro',
				color: 'Прозрачный',
				description: 'Ударопрочный, антибликовое покрытие',
				image: '/chehol.jpg',
			},
			{
				id: 202,
				name: 'Чехол Galaxy S21 Ultra',
				price: 899,
				brand: 'DurableGear',
				color: 'Чёрный',
				description: 'Матовый силикон, магнитная подставка',
				image: '/chehol.jpg',
			},
			{
				id: 203,
				name: 'Чехол Galaxy S21 Ultra',
				price: 899,
				brand: 'DurableGear',
				color: 'Чёрный',
				description: 'Матовый силикон, магнитная подставка',
				image: '/chehol.jpg',
			},
			{
				id: 204,
				name: 'Чехол Galaxy S21 Ultra',
				price: 899,
				brand: 'DurableGear',
				color: 'Чёрный',
				description: 'Матовый силикон, магнитная подставка',
				image: '/chehol.jpg',
			},
		],
	},
]

export default function Page() {
	return (
		<>
			<Categories categories={testData} />
		</>
	)
}
