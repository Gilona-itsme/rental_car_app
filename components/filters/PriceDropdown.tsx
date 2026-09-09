"use client";

import SelectDropdown from "./SelectDropdown";

const PRICES = [30, 40, 50, 60, 70, 80];

type PriceDropdownProps = {
  value: number | "";
  onChange: (value: number) => void;
};

export default function PriceDropdown({ value, onChange }: PriceDropdownProps) {
  return (
    <SelectDropdown
      label="Price / 1 hour"
      placeholder="Choose a price"
      value={value}
      onChange={(v) => onChange(Number(v))}
      options={PRICES.map((price) => ({ label: String(price), value: price }))}
      formatSelected={(option) => `To $${option.label}`}
    />
  );
}