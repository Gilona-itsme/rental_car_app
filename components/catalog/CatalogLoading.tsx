export default function CatalogLoading() {
  return (
    <div className="absolute inset-0 z-20">
      <div className="absolute left-1/2 top-0 h-full w-screen -translate-x-1/2 bg-background-main/89 " />

      <div className="absolute top-30 left-1/2 -translate-x-1/2">
        <div className="flex w-full min-w-135 flex-col items-center rounded-xl bg-white px-24 py-12 ">
          <div className="mb-6 h-18 w-18 animate-spin rounded-full border-6 border-gray-light border-t-light-blue" />

          <h2 className="mb-4 font-h2  text-main">
            Loading cars...
          </h2>

          <p className="text-center font-body text-main">
            Please wait while we fetch the best cars for you
          </p>
        </div>
      </div>
    </div>
  );
}