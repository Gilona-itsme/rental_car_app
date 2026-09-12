"use client";

import Image from "next/image";

type CatalogNotFoundProps = {
  onReset: () => void;
};

export default function CatalogNotFound({
  onReset,
}: CatalogNotFoundProps) {
  return (
    <div className="flex flex-col items-center  text-center mt-10">
      <div className="relative h-97 min-w-103 ">
        <Image
          src="/illustrations/no-cars-found.jpg"
          alt=""
          fill
          className="object-contain mix-blend-multiply"
        />
      </div>

      <h2 className="mt-10 font-h2 text-main">No cars found</h2>

      <p className="mt-4 max-w-87 font-body text-gray">
        We couldn`t find any cars that match your current filters. Try
        changing your search criteria or reset the filters.
      </p>

       <button
        type="button"
        onClick={onReset}
        className="btn-outline-accent mt-10"
      >
        Reset filters
      </button>
    </div>
  );
}
