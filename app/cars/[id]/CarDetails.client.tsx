"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCarById, createBookingCar } from "@/lib/api";
import { useBookingDraftStore } from "@/lib/store/bookingStore";
import { bookingSchema, type BookingFormData } from "@/lib/validation_schema";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
	const queryClient = useQueryClient();
	const { draft, setDraft, clearDraft } = useBookingDraftStore();
	const [isHydrated, setIsHydrated] = useState(false);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<BookingFormData>({
		resolver: zodResolver(bookingSchema),
		defaultValues: draft,
		mode: "onChange",
	});

	const {
		data: car,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["car", id],
		queryFn: () => fetchCarById(id),
	});

	useEffect(() => {
		if (useBookingDraftStore.persist.hasHydrated()) {
			setIsHydrated(true);
		}
		const unsubscribe = useBookingDraftStore.persist.onFinishHydration(() => {
			setIsHydrated(true);
		});
		return unsubscribe;
	}, []);

	const bookingMutation = useMutation({
		mutationFn: (data: BookingFormData) => createBookingCar(data, id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["car", id] });
			clearDraft();
			router.back();
		},
	});

	const values = useWatch({ control });

	useEffect(() => {
		if (!values) return;

		setDraft(values);
	}, [values, setDraft]);
	const onSubmitForm = (data: BookingFormData) => {
		setDraft(data);
		bookingMutation.mutate(data);
	};

	if (isLoading) {
		return (
			<p className='mx-auto max-w-300 px-6 py-20 text-center text-lg text-gray'>
				Loading car details...
			</p>
		);
	}

	if (isError || !car) {
		return (
			<p className='mx-auto max-w-300 px-6 py-20 text-center text-lg text-error'>
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
	].filter(Boolean) as {
		icon: string;
		label: string;
		value: string | number;
	}[];

	return (
		<div className='mx-auto grid max-w-300 grid-cols-1 gap-8  pt-21 pb-44 lg:grid-cols-[1fr_528px]'>
			<div className=' flex flex-col gap-6'>
				<div className='relative h-128 w-full overflow-hidden rounded-xl'>
					<Image
						src={car.img}
						alt={`${car.brand} ${car.model}`}
						fill
						sizes='(max-width: 1024px) 100vw, 900px'
						className='object-cover'
					/>
				</div>

				<div className='rounded-xl bg-white p-6'>
					<h2 className='font-h3 mb-2'>Book your car now</h2>
					<p className=' text-base text-gray mb-6'>
						Stay connected! We are always ready to help you.
					</p>

					{isHydrated ? (
						<form
							className='flex flex-col gap-4'
							onSubmit={handleSubmit(onSubmitForm)}>
							<div>
								<div className='relative'>
									<input
										id='name'
										className={`peer field ${errors.name ? "field-error pr-10" : ""}`}
										placeholder=' '
										{...register("name")}
									/>
									<label
										htmlFor='name'
										className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 px-1 text-base rounded-xs transition-all
                                         peer-focus:top-0 peer-focus:text-sm 
                                         peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-sm
                                         ${errors.name ? "text-error bg-error-light rounded-2" : "bg-inputs peer-focus:bg-white"}
                                       `}>
										Name*
									</label>
									{errors.name && (
										<Image
											src='/icons/error.svg'
											alt='error'
											className='absolute right-4 top-1/2 w-5 h-5 -translate-y-1/2'
											width={16}
											height={16}
										/>
									)}
								</div>
								{errors.name && (
									<p className='mt-1 font-body-2 text-error'>
										{errors.name.message}
									</p>
								)}
							</div>

							<div>
								<div className='relative'>
									<input
										id='email'
										className={`peer field ${errors.email ? "field-error pr-10" : ""}`}
										placeholder=' '
										{...register("email")}
									/>
									<label
										htmlFor='email'
										className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 px-1 text-base rounded-xs  transition-all
                                        peer-focus:top-0 peer-focus:text-sm 
                                        peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-sm
                                        ${errors.email ? "text-error bg-error-light" : "bg-inputs peer-focus:bg-white"}
                                      `}>
										Email*
									</label>
									{errors.email && (
										<Image
											src='/icons/error.svg'
											alt='error'
											className='absolute right-4 top-1/2 w-5 h-5 -translate-y-1/2'
											width={16}
											height={16}
										/>
									)}
								</div>
								{errors.email && (
									<p className='mt-1 font-body-2 text-error'>
										{errors.email.message}
									</p>
								)}
							</div>

							<div>
								<div className='relative'>
									<textarea
										id='comment'
										className={`peer field min-h-22 ${errors.comment ? "field-error pr-10" : ""}`}
										placeholder=' '
										resize='none'
										{...register("comment")}
									/>
									<label
										htmlFor='comment'
										className={`pointer-events-none absolute left-3 top-6 -translate-y-1/2 px-1 text-base rounded-xs  transition-all
                                      peer-focus:top-0 peer-focus:text-sm 
                                      peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-sm
                                      ${errors.comment ? "text-error bg-error-light" : "bg-inputs peer-focus:bg-white"}
                                    `}>
										Comment
									</label>
									{errors.comment && (
										<Image
											src='/icons/error.svg'
											alt='error'
											className='absolute right-4 top-6 w-5 h-5 -translate-y-1/2'
											width={16}
											height={16}
										/>
									)}
									{errors.comment && (
										<p className='mt-1 font-body-2 text-error'>
											{errors.comment.message}
										</p>
									)}
								</div>
							</div>

							{bookingMutation.isError && (
								<p className='text-sm text-error'>
									Failed to send your request. Please try again.
								</p>
							)}

							{bookingMutation.isSuccess && (
								<p className='text-sm text-light-blue'>
									Thanks! We&apos;ll be in touch shortly.
								</p>
							)}

							<button
								type='submit'
								className='btn-primary mt-6'
								disabled={bookingMutation.isPending}>
								{bookingMutation.isPending ? "Sending..." : "Send"}
							</button>
						</form>
					) : null}
				</div>
			</div>

			<div className='rounded-xl bg-white px-6 py-8'>
				<div className='mb-1 flex flex-wrap items-baseline gap-2'>
					<h1 className='font-h2'>
						{car.brand} {car.model}, {car.year}
					</h1>
					<span className='text-base text-gray'>Article: {car.id}</span>
				</div>
				<div className='flex gap-1 items-center mb-4'>
					<Image src='/icons/location.svg' alt='' width={16} height={16} />{" "}
					<p className='  text-base text-main'>
						{car.location?.city}, {car.location?.country}
					</p>
				</div>

				<p className='mb-8 font-h2  text-light-blue'>${car.rentalPrice}</p>
				<p className=' text-base text-main'>{car.description}</p>
				<div className='mt-17 flex flex-col gap-6'>
					{!!car.rentalConditions?.length && (
						<div className='flex flex-col gap-5'>
							<h3 className='font-h3 '>Rental Conditions:</h3>
							<ul className=' flex flex-col gap-2 border-b pb-6  border-gray-light  text-base'>
								{car.rentalConditions.map((condition) => (
									<li key={condition} className='flex items-center gap-2'>
										<Image
											src='/icons/check-circle.svg'
											alt=''
											width={16}
											height={16}
										/>
										{condition}
									</li>
								))}
							</ul>
						</div>
					)}
					<div className='flex flex-col gap-5'>
						<h3 className='font-h3 '>Car Specifications:</h3>
						<ul className=' flex flex-col gap-2 border-b border-gray-light pb-6 text-base'>
							{specs.map(({ icon, label, value }) => (
								<li key={label} className='flex items-center gap-2'>
									<Image src={icon} alt='' width={16} height={16} />
									{label}: {value}
								</li>
							))}
						</ul>
					</div>

					{!!(car.features?.length > 0) && (
						<div className='flex flex-col gap-5'>
							<h3 className='font-h3 '>Features</h3>
							<ul className='flex flex-col gap-2 text-base'>
								{car.features.map((feature) => (
									<li key={feature} className='flex items-center gap-2'>
										<Image
											src='/icons/check-circle.svg'
											alt=''
											width={16}
											height={16}
										/>
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
