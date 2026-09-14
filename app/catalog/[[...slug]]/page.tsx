import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchCars } from "@/lib/api";
import {PER_PAGE, } from "@/lib/store/catalog";
import CarsClient from "./Cars.client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalog | RentalCar",
  description: "Browse our full catalog of rental cars.",
};


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

export default async function CarsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["cars", { perPage: PER_PAGE, ...EMPTY_FILTERS }],
    queryFn: ({ pageParam = 1 }) =>
      fetchCars({ page: pageParam, perPage: PER_PAGE }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarsClient />
    </HydrationBoundary>
  );
}