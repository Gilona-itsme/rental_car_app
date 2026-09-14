"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchFilters } from "@/lib/api";

import {EMPTY_FILTERS} from "@/types/store/catalog"


export function useCarFilters() {
  const query = useQuery({
    queryKey: ["filters"],
    queryFn: fetchFilters,
  });

  return { ...query, filters: query.data ?? EMPTY_FILTERS };
}