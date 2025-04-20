export default function Map() {
	return (
		<div style={{ position: 'relative', overflow: 'hidden' }}>
			<a
				href='https://yandex.ru/maps/org/donskoy_gosudarstvenny_tekhnicheskiy_universitet_priyomnaya_komissiya/37547176922/?utm_medium=mapframe&utm_source=maps'
				style={{
					color: '#eee',
					fontSize: '12px',
					position: 'absolute',
					top: '0px',
				}}
			>
				Донской государственный технический университет, приёмная комиссия
			</a>
			<a
				href='https://yandex.ru/maps/39/rostov-na-donu/category/university/184106140/?utm_medium=mapframe&utm_source=maps'
				style={{
					color: '#eee',
					fontSize: '12px',
					position: 'absolute',
					top: '14px',
				}}
			>
				ВУЗ в Ростове‑на‑Дону
			</a>
			<iframe
				src='https://yandex.ru/map-widget/v1/?ll=39.714182%2C47.236811&mode=poi&poi%5Bpoint%5D=39.712281%2C47.237276&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D37547176922&z=17.23'
				width='560'
				height='400'
				frameBorder={1}
				allowFullScreen={true}
				style={{ position: 'relative' }}
				className='w-full h-134'
			></iframe>
		</div>
	)
}
