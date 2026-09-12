"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchCarById } from "@/lib/api";
import BookingForm from "@/components/booking/BookingForm";

const SPEC_ICONS: Record<string, string> = {
	year: "/icons/calendar.svg",
	type: "/icons/car.svg",
	fuelConsumption: "/icons/fuel-pump.svg",
	engine: "/icons/gear.svg",
	mileage: "/icons/road-horizon.svg",
	location: "/icons/location.svg",
};

export default function CarDetailsClient() {
	const { id } = useParams<{ id: string }>();
	const router = useRouter();

	const {
		data: car,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["car", id],
		queryFn: () => fetchCarById(id),
	});

	if (isLoading) {
		return (
			<p className="mx-auto max-w-300 px-6 py-20 text-center text-lg text-gray">
				Loading car details...
			</p>
		);
	}

	if (isError || !car) {
		return (
			<p className="mx-auto max-w-300 px-6 py-20 text-center text-lg text-error">
				Failed to load car details.
			</p>
		);
	}

	const specs = [
		{ icon: SPEC_ICONS.year, label: "Year", value: car.year },
		{ icon: SPEC_ICONS.type, label: "Type", value: car.type },
		car.fuelConsumption && {
			icon: SPEC_ICONS.fuelConsumption,
			label: "Fuel Consumption",
			value: car.fuelConsumption,
		},
		car.engine && {
			icon: SPEC_ICONS.engine,
			label: "Engine",
			value: car.engine,
		},
		{
			icon: SPEC_ICONS.mileage,
			label: "Mileage",
			value: `${car.mileage.toLocaleString("uk-UA")} km`,
		},
	].filter(Boolean) as { icon: string; label: string; value: string | number }[];

	return (
		<div className="mx-auto grid max-w-300 grid-cols-1 gap-8 pb-44 pt-21 lg:grid-cols-[1fr_528px]">
			<div className="flex flex-col gap-8">
				<div className="relative h-128 w-full overflow-hidden rounded-xl">
					<Image
						src={car.img}
						alt={`${car.brand} ${car.model}`}
						priority
						fill
						sizes="(max-width: 1024px) 100vw, 900px"
						className="object-cover"
					/>
				</div>

				<div className="rounded-xl bg-white p-8">
					<h2 className="font-h3 mb-2">Book your car now</h2>
					<p className="mb-6 font-body text-gray">
						Stay connected! We are always ready to help you.
					</p>

					<BookingForm carId={id} onSuccess={() => router.back()} />
				</div>
			</div>

			<div className="rounded-xl bg-white px-6 py-8 flex flex-col gap-17">
				<div>
					<div className="mb-1 flex flex-wrap items-baseline gap-2">
					<h1 className="font-h2">
						{car.brand} {car.model}, {car.year}
					</h1>
					<span className="font-body text-gray">Article: {car.id}</span>
				</div>
				<div className="mb-4 flex items-center gap-1">
					<Image src="/icons/location.svg" alt="location" width={16} height={16} />
					<p className="font-body text-main">
						{car.location?.city}, {car.location?.country}
					</p>
				</div>

				<p className="font-h2 mb-8 text-light-blue">${car.rentalPrice}</p>
				<p className="font-body text-main">{car.description}</p>
				</div>
				

				<div className="flex flex-col gap-6">
					{!!car.rentalConditions?.length && (
						<div className="flex flex-col gap-5">
							<h3 className="font-h3">Rental Conditions:</h3>
							<ul className="flex flex-col gap-4 border-b border-gray-light pb-6 text-base">
								{car.rentalConditions.map((condition) => (
									<li key={condition} className="flex items-center gap-2">
										<Image src="/icons/check-circle.svg" alt="check-circle" width={16} height={16} />
										{condition}
									</li>
								))}
							</ul>
						</div>
					)}

					<div className="flex flex-col gap-5">
						<h3 className="font-h3">Car Specifications:</h3>
						<ul className="flex flex-col gap-4 border-b border-gray-light pb-6 text-base">
							{specs.map(({ icon, label, value }) => (
								<li key={label} className="flex items-center gap-2">
									<Image src={icon} alt={icon} width={16} height={16} />
									{label}: {value}
								</li>
							))}
						</ul>
					</div>

					{!!(car.features?.length > 0) && (
						<div className="flex flex-col gap-5">
							<h3 className="font-h3">Features</h3>
							<ul className="flex flex-col gap-4 text-base">
								{car.features.map((feature) => (
									<li key={feature} className="flex items-center gap-2">
										<Image src="/icons/check-circle.svg" alt="check-circle" width={16} height={16} />
										{feature}
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}