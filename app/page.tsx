import Link from "next/link";
import Image from "next/image";

export default function Home() {
	return (
		<div className='bg-white  pt-1'>
			<section className='relative overflow-hidden min-h-[calc(100vh-64px)] flex items-end pb-8 md:pb-15'>
				<Image
					src='/illustrations/hero-car.jpg'
					alt='Hero car'
					fill
					priority
					fetchPriority='high'
					sizes='100vw'
					className='object-cover'
					quality={75}
				/>
				<div className='relative z-10 mx-auto w-full max-w-300 px-4 sm:px-6 text-center'>
					<div className='text-center'>
						<h1 className='font-h1 text-white text-3xl sm:text-4xl md:text-5xl'>
							Find your perfect rental car
						</h1>
						<h2 className='mt-3 md:mt-4 font-h2 text-white text-base sm:text-lg md:text-2xl'>
							Reliable and budget-friendly rentals for any journey
						</h2>
					</div>
					<Link
						href='/catalog'
						className='btn-primary mt-6 md:mt-10 w-full sm:w-auto sm:min-w-61 inline-flex justify-center'>
						View Catalog
					</Link>
				</div>
			</section>
		</div>
	);
}
