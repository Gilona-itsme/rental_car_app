"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { clsx } from "clsx";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Catalog" },
] as const;

const Header =() => {
  const pathname = usePathname();

  return (
    <header className="border-b border-badges bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-10 py-6">
        <Link href="/" className="text-lg  text-main">
         <Image src="/logo.svg" alt="RentalCar logo" width="104" height="16"/>
        </Link>

        <nav className="flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "font-body transition-colors duration-150 ",
                  isActive
                    ? "text-light-blue underline"
                    : "text-main hover:text-light-blue"
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}


export default Header
