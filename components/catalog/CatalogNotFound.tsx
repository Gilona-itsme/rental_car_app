"use client";

import Image from "next/image";

type CatalogNotFoundProps = {
	onReset: () => void;
};

export default function CatalogNotFound({ onReset }: CatalogNotFoundProps) {
	return (
		<div className='flex flex-col items-center  text-center mt-10 gap-10'>
			<div className='relative h-97 min-w-103 '>
				<Image
					src='/illustrations/no-cars-found.jpg'
					alt='no-cars-found'
					priority
					sizes='100vw'
					fill
					className='object-contain mix-blend-multiply'
				/>
			</div>
			<div>
				<h2 className=' font-h2 text-main'>No cars found</h2>
				<p className='mt-4 max-w-87 font-body '>
					We couldn`t find any cars that match your current filters. Try
					changing your search criteria or reset the filters.
				</p>
			</div>

			<button
				type='button'
				onClick={onReset}
				className='btn-outline'>
				Reset filters
			</button>
		</div>
	);
}
