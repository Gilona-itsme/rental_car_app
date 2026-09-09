export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-light border-t-light-blue" />

        <p className="text-lg font-medium text-main">
          Loading...
        </p>
      </div>
    </div>
  );
}