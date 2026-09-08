export default function Loading() {
  return (
    <main className="mx-auto max-w-300 px-4 py-10">
      <div className="animate-pulse">
        <div className="mb-8 h-12 w-72 rounded bg-slate-200" />

        <div className="mb-4 h-6 w-full rounded bg-slate-200" />
        <div className="mb-4 h-6 w-4/5 rounded bg-slate-200" />
        <div className="mb-10 h-6 w-3/5 rounded bg-slate-200" />

        <div className="h-12 w-40 rounded bg-slate-200" />
      </div>
    </main>
  );
}