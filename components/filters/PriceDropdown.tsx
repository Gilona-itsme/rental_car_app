"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchFilters } from "@/lib/api";
import SelectDropdown from "./SelectDropdown";

type PriceDropdownProps = {
  value: number | "";
  onChange: (value: number) => void;
};

export default function PriceDropdown({
  value,
  onChange,
}: PriceDropdownProps) {
  const { data: filters } = useQuery({
    queryKey: ["filters"],
    queryFn: fetchFilters,
  });

 const prices = filters
  ? Array.from(
      {
        length: Math.floor(
          (filters.price.max - filters.price.min) / 10
        ) + 1,
      },
      (_, i) => filters.price.min + i * 10
    )
  : [];

  return (
    <SelectDropdown
      label="Price / 1 hour"
      placeholder="Choose a price"
      value={value}
      panelClassName="h-[188px]"
      onChange={(value) => onChange(Number(value))}
      options={prices.map((price) => ({
        label: String(price),
        value: price,
      }))}
      formatSelected={(option) => `To $${option.label}`}
      
    />
  );
}