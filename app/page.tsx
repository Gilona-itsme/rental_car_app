
export default function Home() {
	return (
		<section className="min-h-[calc(100vh-64px)] bg-[url('/hero-car.jpg')] bg-cover bg-center flex items-end pb-15">
			<div className='mx-auto w-full max-w-300 px-6 text-center'>
				<div className='text-center'>
					<h1 className='text-6xl/18 font-bold text-white'>
						Find your perfect rental car
					</h1>
					<h2 className='mt-4 text-2xl font-semibold text-white'>
						Reliable and budget-friendly rentals for any journey
					</h2>
				</div>
				<button className="btn-primary mt-10 min-w-61">
					View Catalog
				</button>
			</div>
		</section>
	);
}
