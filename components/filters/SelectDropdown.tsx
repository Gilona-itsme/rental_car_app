"use client";

import { Listbox } from "@headlessui/react";
import { VscChevronUpCompact, VscChevronDownCompact } from "react-icons/vsc";
import { Fragment } from "react";
import clsx from "clsx";

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
	panelClassName?: string;
	className?: string;
};

export default function SelectDropdown({
	label,
	placeholder,
	options,
	value,
	onChange,
	formatSelected,
	panelClassName = "h-48",
	className = "",
}: SelectDropdownProps) {
	const selectedOption = options.find((o) => o.value === value);

	return (
		<div className={clsx("w-full shrink-0", className)}>
			<Listbox value={value} onChange={onChange}>
				{({ open }) => (
					<div className='relative'>
						<label className='field-label font-body-2'>{label}</label>

						<Listbox.Button
							className={clsx(
								"select-trigger w-full",
								open && "ring-2 ring-light-blue",
							)}>
							<span className='font-body truncate'>
								{selectedOption
									? formatSelected
										? formatSelected(selectedOption)
										: selectedOption.label
									: placeholder}
							</span>

							{open ? (
								<VscChevronUpCompact size={16} className='shrink-0 text-main' />
							) : (
								<VscChevronDownCompact
									size={16}
									className='shrink-0 text-main'
								/>
							)}
						</Listbox.Button>

						<Listbox.Options as={Fragment}>
							<ul
								className={clsx("select-panel absolute z-20", panelClassName)}>
								{options.map((option) => (
									<Listbox.Option
										key={option.value}
										value={option.value}
										as={Fragment}>
										{({ active, selected }) => (
											<li
												className={clsx(
													"font-body",
													selected ? "select-option-active" : "select-option",
													active && "bg-badges",
												)}>
												{option.label}
											</li>
										)}
									</Listbox.Option>
								))}
							</ul>
						</Listbox.Options>
					</div>
				)}
			</Listbox>
		</div>
	);
}
