import Image from "next/image";
import Link from "next/link";
import type { Car } from "@/types/car";

type CarItemProps = {
	car: Car;
};

export default function CarItem({ car }: CarItemProps) {
	const locationItems = [
		car.location.city,
		car.location.country,
		car.rentalCompany,
	];
	const specItems = [car.type, `${car.mileage.toLocaleString("uk-UA")} km`];

	return (
		<div className='flex h-full  flex-col gap-4 rounded-xl bg-white p-4'>
			<div className='relative h-67 w-full shrink-0 overflow-hidden rounded-lg'>
				<Image
					src={car.img}
					alt={`${car.brand} ${car.model}`}
					fill
					sizes='(max-width: 550px) 100vw, (max-width: 600px) 50vw, 25vw'
					className='object-cover'
				/>
			</div>

			<div className='flex flex-1 flex-col justify-between gap-6'>
				<div className='flex flex-col gap-2'>
					<div className='flex items-center justify-between'>
						<p className='font-body'>
							{car.brand} <span className='text-light-blue'>{car.model}</span>,{" "}
							{car.year}
						</p>
						<p className='font-body'>${car.rentalPrice}</p>
					</div>

					<div className='flex flex-col gap-1 rounded-xs bg-badges p-2'>
						<ul className='flex flex-wrap items-center divide-x divide-gray-light'>
							{locationItems.map((item, i) => (
								<li key={i} className='px-1.5 font-body-2  first:pl-0'>
									{item}
								</li>
							))}
						</ul>
						<ul className='flex flex-wrap items-center divide-x divide-gray-light'>
							{specItems.map((item, i) => (
								<li key={i} className='px-1.5 font-body-2 first:pl-0'>
									{item}
								</li>
							))}
						</ul>
					</div>
				</div>

				<Link
					href={`/catalog/${car.id}`}
					target='_blank'
					rel='noopener noreferrer'
					className='btn-primary w-full'>
					Read more
				</Link>
			</div>
		</div>
	);
}
