import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import "./globals.css";

const manrope = Manrope({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin", "cyrillic"],
	variable: "--font-manrope",
	display: "swap",
});

const siteUrl = "https://rental_car_app-gilona.vercel.app/";

export const metadata: Metadata = {
	title: "RentalCar — find your perfect rental car",
	description: "Reliable and budget-friendly car rentals for any journey.",
	icons: {
		icon: { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
		shortcut: "/favicon.ico",
		apple: [
			{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
		],
	},
	manifest: "/site.webmanifest",
	openGraph: {
		title: "RentalCar — find your perfect rental car",
		description: "Reliable and budget-friendly car rentals for any journey.",
		url: siteUrl,
		siteName: "RentalCar",
		images: [
			{
				url: `${siteUrl}/og-image.jpg`,
				width: 1200,
				height: 630,
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "RentalCar — find your perfect rental car",
		description: "Reliable and budget-friendly car rentals for any journey.",
		images: [`${siteUrl}/og-image.jpg`],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className={manrope.variable}>
			<body className='bg-white '>
        <TanStackProvider>
				<Header />
				<main>{children}</main>
        </TanStackProvider>
			</body>
		</html>
	);
}
