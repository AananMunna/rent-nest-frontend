export default function LandlordRequestsLoading() {
  return (
    <div className="animate-pulse">
      <div className="space-y-2">
        <div className="h-8 w-56 rounded bg-muted" />
        <div className="h-4 w-72 rounded bg-muted" />
      </div>

      <div className="mt-6 space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="rounded-xl border p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="size-11 rounded-full bg-muted" />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-4 w-56 rounded bg-muted" />
                <div className="h-4 w-40 rounded bg-muted" />
                <div className="h-3 w-72 rounded bg-muted" />
              </div>
              <div className="h-10 w-44 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}