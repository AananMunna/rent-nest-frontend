export default function LandlordPropertiesLoading() {
  return (
    <div className="animate-pulse">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-8 w-48 rounded bg-muted" />
          <div className="h-4 w-56 rounded bg-muted" />
        </div>
        <div className="h-10 w-36 rounded bg-muted" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="rounded-xl border p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="size-20 shrink-0 rounded-lg bg-muted" />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-5 w-64 rounded bg-muted" />
                <div className="h-4 w-40 rounded bg-muted" />
                <div className="h-3 w-52 rounded bg-muted" />
              </div>
              <div className="flex items-center gap-3">
                <div className="h-9 w-24 rounded bg-muted" />
                <div className="h-10 w-10 rounded bg-muted" />
                <div className="h-10 w-10 rounded bg-muted" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}