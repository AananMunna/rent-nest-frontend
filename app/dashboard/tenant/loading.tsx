export default function TenantLoading() {
  return (
    <div className="animate-pulse">
      <div className="space-y-2">
        <div className="h-8 w-48 rounded bg-muted" />
        <div className="h-4 w-72 rounded bg-muted" />
      </div>

      <div className="mt-6">
        <div className="flex gap-2">
          <div className="h-10 w-40 rounded-md bg-muted" />
          <div className="h-10 w-40 rounded-md bg-muted" />
        </div>

        <div className="mt-4 space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-xl border p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="size-20 shrink-0 rounded-lg bg-muted" />
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-5 w-64 rounded bg-muted" />
                  <div className="h-4 w-44 rounded bg-muted" />
                  <div className="h-3 w-56 rounded bg-muted" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-7 w-24 rounded bg-muted" />
                  <div className="h-10 w-24 rounded bg-muted" />
                  <div className="h-10 w-28 rounded bg-muted" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}