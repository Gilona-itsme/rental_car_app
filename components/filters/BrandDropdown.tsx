"use client";

import SelectDropdown from "./SelectDropdown";

const BRANDS = [
  "Aston Martin",
  "Audi",
  "BMW",
  "Bentley",
  "Buick",
  "Chevrolet",
  "Chrysler",
  "GMC",
  "HUMMER",
  "Subaru",
  "Volvo",
];

type BrandDropdownProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function BrandDropdown({ value, onChange }: BrandDropdownProps) {
  return (
    <SelectDropdown
      label="Car brand"
      placeholder="Choose a brand"
      value={value}
      onChange={(v) => onChange(String(v))}
      options={BRANDS.map((brand) => ({ label: brand, value: brand }))}
    />
  );
}