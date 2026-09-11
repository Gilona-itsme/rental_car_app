import type { Car } from "@/types/car";
import CarItem from "./CarItem";

type CarListProps = {
  cars: Car[];
};

export default function CarList({ cars }: CarListProps) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
      {cars.map((car) => (
        <CarItem key={car.id} car={car} />
      ))}
    </div>
  );
}