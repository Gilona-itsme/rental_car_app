"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function CarsError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className='mx-auto flex max-w-360 flex-col items-center justify-center px-6 py-32 text-center'>
			<p className='font-h2 mb-2 text-error'>Something went wrong</p>
			<h1 className='font-h1 mb-4'>Failed to load cars</h1>
			<p className='mb-8 max-w-md text-lg text-gray'>
				We couldn`t load the car catalog. Please check your connection and try
				again.
			</p>
			<div className='flex gap-4'>
				<button className='btn-primary' onClick={() => reset()}>
					Try again
				</button>
				<Link href='/catalog' className='btn-outline'>
					Back to catalog
				</Link>
			</div>
		</div>
	);
}
