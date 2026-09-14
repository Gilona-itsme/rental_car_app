export default function Loading() {
	return (
		<div className='fixed inset-0 z-20 flex items-center justify-center mt-17'>
			<div className='absolute inset-0 bg-background-main/89' />

			<div className='relative flex min-w-135 max-w-md flex-col items-center rounded-xl bg-white px-24 py-12 shadow-lg'>
				<div className='mb-6 h-18 w-18 animate-spin rounded-full border-6 border-gray-light border-t-light-blue' />

				<h2 className='mb-4 font-h2 text-main'>Loading...</h2>

				<p className='text-center font-body text-main'>
					Please wait...
				</p>
			</div>
		</div>
	);
}
