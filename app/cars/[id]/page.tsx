import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CarDetailsClient from "./CarDetails.client";
import { fetchCarById } from "@/lib/api";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const car = await fetchCarById(id);

    const title = `${car.brand} ${car.model}, ${car.year} | RentalCar`;
    const description =
      car.description?.slice(0, 160) ??
      `Rent a ${car.brand} ${car.model} (${car.year}) for $${car.rentalPrice}/hour.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://rentalcar.com/cars/${id}`,
        images: [
          {
            url: car.img,
            width: 1200,
            height: 630,
            alt: `${car.brand} ${car.model}`,
          },
        ],
      },
    };
  } catch {
    return {
      title: "Car not found | RentalCar",
      description: "The requested car could not be found",
      openGraph: {
        title: "Car not found | RentalCar",
        description: "The requested car could not be found",
        url: `https://rentalcar.com/cars/${id}`,
        images: [
          {
            url: "/og-image.jpg",
            width: 1200,
            height: 630,
            alt: "RentalCar",
          },
        ],
      },
    };
  }
}

export default async function CarDetailsPage({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["car", id],
    queryFn: () => fetchCarById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarDetailsClient />
    </HydrationBoundary>
  );
}