import Providers from '@/components/providers'
import { dynamicBaseURL } from '@/library/environment/publicVariables'
import type { Metadata, Viewport } from 'next'
import './styles.tailwind.css'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
	title: 'Waffledoku',
	metadataBase: new URL(dynamicBaseURL),
	description: 'Site description',
	alternates: {
		canonical: dynamicBaseURL,
	},
}

export const viewport: Viewport = {
	initialScale: 1,
	width: 'device-width',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<html lang="en-GB" suppressHydrationWarning>
			<body className="text-base bg-gray-100">
				<div className="bg-white mx-auto max-w-3xl">
					<Providers>{children}</Providers>
				</div>
			</body>
		</html>
	)
}
