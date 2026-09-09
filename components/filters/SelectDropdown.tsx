"use client";

import { Listbox } from "@headlessui/react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Fragment } from "react";

type Option = {
	label: string;
	value: string | number;
};

type SelectDropdownProps = {
	label: string;
	placeholder: string;
	options: Option[];
	value: string | number | "";
	onChange: (value: string | number) => void;
	formatSelected?: (option: Option) => string;
};

export default function SelectDropdown({
	label,
	placeholder,
	options,
	value,
	onChange,
	formatSelected,
}: SelectDropdownProps) {
	const selectedOption = options.find((o) => o.value === value);

	return (
		<div className='w-full'>
			<Listbox value={value} onChange={onChange}>
				{({ open }) => (
					<div className='relative'>
						<label className='field-label font-body-2'>{label}</label>

						<Listbox.Button
							className={`select-trigger ${open ? "ring-2 ring-light-blue" : ""}`}>
							<span className={"font-body"}>
								{selectedOption
									? formatSelected
										? formatSelected(selectedOption)
										: selectedOption.label
									: placeholder}
							</span>
							{open ? (
								<ChevronUp size={16} className='text-main' />
							) : (
								<ChevronDown size={16} className='text-main' />
							)}
						</Listbox.Button>

						<Listbox.Options as={Fragment}>
							<div className='select-panel absolute z-20 '>
								{options.map((option) => (
									<Listbox.Option
										key={option.value}
										value={option.value}
										as={Fragment}>
										{({ active, selected }) => (
											<li
												className={`${"font-body"} ${selected ? "select-option-active" : "select-option"}`}
												style={
													active
														? { backgroundColor: "var(--color-badges)" }
														: undefined
												}>
												{option.label}
											</li>
										)}
									</Listbox.Option>
								))}
							</div>
						</Listbox.Options>
					</div>
				)}
			</Listbox>
		</div>
	);
}
