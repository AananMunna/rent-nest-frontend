export default function PropertyDetailLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 animate-pulse">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-3">
          <div className="h-6 w-28 rounded-full bg-muted" />
          <div className="h-10 w-96 max-w-full rounded bg-muted" />
          <div className="h-5 w-64 rounded bg-muted" />
        </div>
        <div className="space-y-2 text-right">
          <div className="ml-auto h-10 w-40 rounded bg-muted" />
          <div className="ml-auto h-4 w-32 rounded bg-muted" />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 overflow-hidden rounded-xl sm:h-[480px]">
        <div className="col-span-4 aspect-[16/9] bg-muted sm:col-span-3 sm:row-span-2 sm:aspect-auto sm:h-full" />
        <div className="hidden bg-muted sm:block sm:h-full" />
        <div className="hidden bg-muted sm:block sm:h-full" />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <div className="flex flex-wrap gap-6 rounded-xl border p-5">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="size-5 rounded bg-muted" />
                <div>
                  <div className="h-4 w-12 rounded bg-muted" />
                  <div className="mt-1 h-3 w-16 rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="h-6 w-48 rounded bg-muted" />
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-5/6 rounded bg-muted" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="h-6 w-32 rounded bg-muted" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-8 w-24 rounded-full bg-muted" />
              ))}
            </div>
          </div>

          <div className="h-px w-full bg-border" />

          <div className="space-y-4">
            <div className="h-6 w-28 rounded bg-muted" />
            <div className="space-y-3 rounded-xl border p-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="h-4 w-28 rounded bg-muted" />
                  <div className="h-4 w-full rounded bg-muted" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border p-5">
            <div className="space-y-4">
              <div className="h-5 w-24 rounded bg-muted" />
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-muted" />
                <div className="space-y-2">
                  <div className="h-4 w-32 rounded bg-muted" />
                  <div className="h-3 w-16 rounded bg-muted" />
                </div>
              </div>
              <div className="h-px w-full bg-border" />
              <div className="space-y-2">
                <div className="h-4 w-40 rounded bg-muted" />
                <div className="h-4 w-36 rounded bg-muted" />
              </div>
            </div>
          </div>
          <div className="h-12 w-full rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}