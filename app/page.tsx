import Link from "next/link";

export default function Home() {
	return (
		<section className="min-h-[calc(100vh-64px)] bg-[url('/hero-car.jpg')] bg-cover bg-center flex items-end pb-15">
			<div className='mx-auto w-full max-w-300 px-6 text-center'>
				<div className='text-center'>
					<h1 className='font-h1 text-white'>
						Find your perfect rental car
					</h1>
					<h2 className='mt-4 font-h2 text-white'>
						Reliable and budget-friendly rentals for any journey
					</h2>
				</div>
				<button className="btn-primary mt-10 min-w-61">
          <Link href='/catalog' >
					View Catalog
          </Link>
				</button>
			</div>
		</section>
	);
}
