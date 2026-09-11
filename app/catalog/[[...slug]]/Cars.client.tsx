"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchCars } from "@/lib/api";
import type { Car } from "@/types/car";
import BrandDropdown from "@/components/filters/BrandDropdown";
import PriceDropdown from "@/components/filters/PriceDropdown";
import MileageRangeInput from "@/components/filters/MileageRangeInput";
import CarList from "@/components/cars/CarList";

const PER_PAGE = 12;

type Filters = {
  brand: string;
  price: number | "";
  mileageFrom: string;
  mileageTo: string;
};

const EMPTY_FILTERS: Filters = {
  brand: "",
  price: "",
  mileageFrom: "",
  mileageTo: "",
};

export default function CarsClient() {
  const [draft, setDraft] = useState<Filters>(EMPTY_FILTERS);
  const [applied, setApplied] = useState<Filters>(EMPTY_FILTERS);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["cars", { perPage: PER_PAGE, ...applied }],
    queryFn: ({ pageParam = 1 }) =>
      fetchCars({
        page: pageParam,
        perPage: PER_PAGE,
        brand: applied.brand || undefined,
        rentalPrice: applied.price || undefined,
        minMileage: applied.mileageFrom
          ? Number(applied.mileageFrom)
          : undefined,
        maxMileage: applied.mileageTo ? Number(applied.mileageTo) : undefined,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      allPages.length < lastPage.totalPages ? allPages.length + 1 : undefined,
  });

  const cars: Car[] = data?.pages.flatMap((page) => page.cars) ?? [];
  const hasActiveFilters = Object.values(applied).some(Boolean);

  const handleSearch = () => setApplied(draft);
  const handleClearFilters = () => {
    setDraft(EMPTY_FILTERS);
    setApplied(EMPTY_FILTERS);
  };

  const errorMessage =
    error instanceof Error ? error.message : "Failed to load cars";

  return (
    <div className="mx-auto flex w-full max-w-300 flex-col items-center  pt-21 pb-26">
      <div className="w-fit flex items-end flex-col gap-2 mb-15">
        <div className="w-fit flex flex-wrap items-end gap-4">
          <div className="min-w-51">
            <BrandDropdown
              value={draft.brand}
              onChange={(brand) => setDraft((f) => ({ ...f, brand }))}
            />
          </div>

          <div className="min-w-49">
            <PriceDropdown
              value={draft.price}
              onChange={(price) => setDraft((f) => ({ ...f, price }))}
            />
          </div>

          <div className="w-80">
            <MileageRangeInput
              from={draft.mileageFrom}
              to={draft.mileageTo}
              onFromChange={(v) => setDraft((f) => ({ ...f, mileageFrom: v }))}
              onToChange={(v) => setDraft((f) => ({ ...f, mileageTo: v }))}
            />
          </div>

          <button className="btn-primary min-w-39" onClick={handleSearch}>
            Search
          </button>
        </div>

        {hasActiveFilters && (
          <button
            className="font-body text-gray min-w-39 cursor-pointer hover:text-light-blue hover:underline"
            onClick={handleClearFilters}
          >
            Clear filters
          </button>
        )}
      </div>

      {isLoading && (
        <p className="py-20 text-center text-lg text-gray">Loading cars...</p>
      )}

      {isError && (
        <p className="py-20 text-center text-lg text-error">{errorMessage}</p>
      )}

      {!isLoading && !isError && cars.length === 0 && (
        <p className="py-20 text-center text-lg text-gray">
          No cars match your filters.
        </p>
      )}

      <CarList cars={cars} />

      {hasNextPage && (
        <div className="mt-12 flex justify-center">
          <button
            className="btn-outline"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
}