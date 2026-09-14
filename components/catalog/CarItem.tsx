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
		<div className='gap-4 rounded-xl bg-white p-4 flex h-full flex-col'>
			<div className='relative h-55 w-full overflow-hidden rounded-lg'>
				<Image
					src={car.img}
					alt={`${car.brand} ${car.model}`}
					fill
					sizes='(max-width: 550px) 100vw, (max-width: 600px) 50vw, 25vw'
					className='object-cover'
				/>
			</div>

			<div className='mb-auto flex flex-col gap-2'>
				<div className='flex items-center justify-between'>
					<p className='font-body '>
						{car.brand} <span className='text-light-blue'>{car.model}</span>,{" "}
						{car.year}
					</p>
					<p className='font-body'>${car.rentalPrice}</p>
				</div>
				<div className='flex flex-col gap-1 rounded-xs bg-badges p-2 mb-2'>
					<div className='flex flex-wrap items-center divide-x divide-gray-light'>
						{locationItems.map((item, i) => (
							<span
								key={i}
								className='px-1.5 font-body-2 text-gray first:pl-0 '>
								{item}
							</span>
						))}
					</div>
					<div className='flex flex-wrap items-center divide-x divide-gray-light'>
						{specItems.map((item, i) => (
							<span key={i} className='px-1.5 font-body-2 text-gray first:pl-0'>
								{item}
							</span>
						))}
					</div>
				</div>
			</div>
			<Link
				href={`/catalog/${car.id}`}
				target='_blank'
				rel='noopener noreferrer'
				className='btn-primary w-full  '>
				Read more
			</Link>
		</div>
	);
}
