import Image from "next/image";
import Link from "next/link";
import type { Car } from "@/types/car";

type CarItemProps = {
  car: Car;
};

export default function CarItem({ car }: CarItem.Props) {
  const locationItems = [car.location.city, car.location.country, car.rentalCompany];
  const specItems = [car.type, `${car.mileage.toLocaleString()} km`];

  return (
    <div className=" gap-2 rounded-xl bg-white p-4 flex h-full flex-col">
      <div className="relative h-55 w-full mb-2 overflow-hidden rounded-lg">
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="font-body ">
          {car.brand} <span className="text-light-blue">{car.model}</span>,{" "}
          {car.year}
        </p>
        <p className="font-body">${car.rentalPrice}</p>
      </div>

      <div className="flex flex-col gap-1 rounded-xs bg-badges p-2 mb-4">
        <div className="flex flex-wrap items-center divide-x divide-gray-light">
          {locationItems.map((item, i) => (
            <span key={i} className="px-[6px] font-body-2 text-gray first:pl-0 ">
              {item}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center divide-x divide-gray-light">
          {specItems.map((item, i) => (
            <span key={i} className="px-[6px] font-body-2 text-gray first:pl-0">
              {item}
            </span>
          ))}
        </div>
      </div>

      <Link href={`/cars/${car.id}`} className="btn-primary w-full  mt-auto">
        Read more
      </Link>
    </div>
  );
}