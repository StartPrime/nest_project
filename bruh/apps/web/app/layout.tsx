import { Geist, Geist_Mono } from 'next/font/google'
import '@workspace/ui/globals.css'
import { Providers } from '@/components/providers'
import Header from '@/components/header'
import Footer from '@/components/footer'

const fontSans = Geist({
	subsets: ['latin'],
	variable: '--font-sans',
})

const fontMono = Geist_Mono({
	subsets: ['latin'],
	variable: '--font-mono',
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru' suppressHydrationWarning>
			<body
				className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased bg-[#EAEAEA] flex flex-col justify-between min-h-screen`}
			>
				<Header />
				<Providers>{children}</Providers>
				<Footer />
			</body>
		</html>
	)
}
