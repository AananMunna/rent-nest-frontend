export default function PropertiesLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 animate-pulse">
      <div className="mb-8 space-y-2">
        <div className="h-9 w-72 rounded bg-muted" />
        <div className="h-4 w-48 rounded bg-muted" />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        <div className="rounded-xl border p-4">
          <div className="space-y-4">
            <div className="h-5 w-28 rounded bg-muted" />
            <div className="h-10 w-full rounded bg-muted" />
            <div className="h-10 w-full rounded bg-muted" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-10 rounded bg-muted" />
              <div className="h-10 rounded bg-muted" />
            </div>
            <div className="h-10 w-full rounded bg-muted" />
            <div className="h-px w-full bg-border" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="size-4 rounded-full bg-muted" />
                  <div className="h-4 flex-1 rounded bg-muted" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 9 }).map((_, index) => (
              <div key={index} className="overflow-hidden rounded-xl border">
                <div className="aspect-[4/3] bg-muted" />
                <div className="space-y-3 p-4">
                  <div className="h-5 w-4/5 rounded bg-muted" />
                  <div className="h-4 w-2/3 rounded bg-muted" />
                  <div className="h-4 w-1/2 rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <div className="h-10 w-72 rounded bg-muted" />
          </div>
        </div>
      </div>
    </div>
  );
}