import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import  Header from "@/components/Header/Header";
import "./globals.css";

const manrope = Manrope({
  weight: ["400", "500","600", "700"],
	subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RentalCar — Find your perfect rental car",
  description: "Reliable and budget-friendly car rentals for any journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="bg-white ">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}