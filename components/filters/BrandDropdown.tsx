"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchFilters } from "@/lib/api";
import SelectDropdown from "./SelectDropdown";

type BrandDropdownProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function BrandDropdown({
  value,
  onChange,
}: BrandDropdownProps) {
  const { data: filters } = useQuery({
    queryKey: ["filters"],
    queryFn: fetchFilters,
  });


  return (
    <SelectDropdown
      label="Car brand"
      placeholder="Choose a brand"
      value={value}
      panelClassName="h-[272px]"
      onChange={(value) => onChange(String(value))}
      options={
        filters?.brands?.map((brand) => ({
          label: brand,
          value: brand,
        })) ?? []
      }
       
    />
  );
}