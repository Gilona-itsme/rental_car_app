import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page not found",
  description: "The page you are looking for does not exist.",
  alternates: {
    canonical: "/not-found",
  },
  openGraph: {
    title: "404 — Page not found",
    description: "The page you are looking for does not exist.",
    url: "/not-found",
    images: [
      {
        url: "/not-found.jpg",
        width: 1200,
        height: 630,
        alt: "Page not found",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="mx-auto max-w-xl text-center">
        <span className="text-sm font-medium uppercase tracking-widest text-light-blue">
          Error 404
        </span>

        <h1 className="mt-4 text-5xl font-bold tracking-tight text-main md:text-7xl">
          Page not found
        </h1>

        <p className="mt-6 text-lg leading-8 ">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <Link href="/" className="btn-primary mt-10 inline-flex gap-2">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 11.5 12 4l9 7.5M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Go Home
        </Link>
      </div>
    </main>
  );
}