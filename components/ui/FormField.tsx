import Image from "next/image";
import type { UseFormRegisterReturn } from "react-hook-form";
import clsx from "clsx";

type FormFieldProps = {
	id: string;
	label: string;
	error?: string;
	as?: "input" | "textarea";
	registration: UseFormRegisterReturn;
};

export default function FormField({
	id,
	label,
	error,
	as = "input",
	registration,
}: FormFieldProps) {
	const Tag = as;
	const isTextarea = as === "textarea";

	return (
		<div>
			<div className='relative'>
				<Tag
					id={id}
					placeholder=' '
					className={`peer field font-body ${isTextarea ? "min-h-22 resize-none" : ""} ${
						error ? "field-error pr-10" : ""
					}`}
					{...registration}
				/>
				<label
					htmlFor={id}
					className={clsx(
						"pointer-events-none absolute left-3 rounded-xs px-1 font-body transition-all",
						isTextarea ? "top-6" : "top-1/2",
						"-translate-y-1/2",
						"peer-focus:top-0 peer-focus:font-body ",
						"peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:font-body ",
						error
							? "bg-error-light text-error"
							: "bg-inputs text-gray ",
					)}>
					{label}
				</label>
				{error && (
					<Image
						src='/icons/error.svg'
						alt='error'
						width={16}
						height={16}
						className={`absolute right-4 ${
							isTextarea ? "top-6" : "top-1/2"
						} h-5 w-5 -translate-y-1/2`}
					/>
				)}
			</div>
			{error && <p className='font-body-2  text-error'>{error}</p>}
		</div>
	);
}
