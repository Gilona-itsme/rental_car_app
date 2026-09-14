"use client";

import { useQuery } from "@tanstack/react-query";
import {  fetchFilters } from "@/lib/api";
import { type CarFilters } from "@/types/car";

const EMPTY_FILTERS: CarFilters = {
  brands: [],
  price: { min: 0, max: 0 },
};

export function useCarFilters() {
  const query = useQuery({
    queryKey: ["filters"],
    queryFn: fetchFilters,
  });

  return { ...query, filters: query.data ?? EMPTY_FILTERS };
}