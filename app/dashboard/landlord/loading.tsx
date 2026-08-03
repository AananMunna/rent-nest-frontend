export default function LandlordLoading() {
  return (
    <div className="animate-pulse">
      <div className="space-y-2">
        <div className="h-8 w-72 rounded bg-muted" />
        <div className="h-4 w-80 rounded bg-muted" />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-xl border p-5 space-y-3">
            <div className="h-5 w-24 rounded bg-muted" />
            <div className="h-9 w-20 rounded bg-muted" />
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-xl border p-5 space-y-4">
        <div className="h-5 w-36 rounded bg-muted" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between gap-4 border-b pb-3 last:border-0 last:pb-0">
              <div className="space-y-2">
                <div className="h-4 w-56 rounded bg-muted" />
                <div className="h-3 w-32 rounded bg-muted" />
              </div>
              <div className="h-7 w-24 rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}