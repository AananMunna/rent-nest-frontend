export default function AdminLoading() {
  return (
    <div className="animate-pulse">
      <div className="space-y-2">
        <div className="h-8 w-72 rounded bg-muted" />
        <div className="h-4 w-56 rounded bg-muted" />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="rounded-xl border p-5 space-y-3">
            <div className="h-5 w-24 rounded bg-muted" />
            <div className="h-9 w-20 rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}