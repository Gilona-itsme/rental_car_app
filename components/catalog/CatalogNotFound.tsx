import Link from "next/link";
import Image from "next/image";

export default function CatalogNotFound() {
  return (
    <div className="flex flex-col items-center px-6 py-20 text-center">
      <div className="relative h-56 w-56 sm:h-64 sm:w-64">
        <Image
          src="/illustrations/no-cars-found.jpg"
          alt=""
          fill
          className="object-contain mix-blend-multiply"
        />
      </div>

      <h2 className="mt-8 text-2xl font-bold text-main">No cars found</h2>

      <p className="mt-3 max-w-md text-lg text-gray">
        We couldn`t find any cars that match your current filters. Try
        changing your search criteria or reset the filters.
      </p>

      <Link href="/catalog" className="btn-outline-accent mt-8">
        Reset filters
      </Link>
    </div>
  );
}
