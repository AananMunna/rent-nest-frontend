export default function DashboardLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-pulse">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-6">
          <div className="flex items-center gap-3 rounded-lg border p-3">
            <div className="size-10 rounded-full bg-muted" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-4 w-32 rounded bg-muted" />
              <div className="h-3 w-20 rounded bg-muted" />
            </div>
          </div>
          <div className="space-y-3 rounded-xl border p-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-10 rounded-lg bg-muted" />
            ))}
          </div>
        </aside>
        <main className="space-y-6">
          <div className="space-y-2">
            <div className="h-8 w-64 rounded bg-muted" />
            <div className="h-4 w-80 rounded bg-muted" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="rounded-xl border p-5 space-y-3">
                <div className="h-5 w-24 rounded bg-muted" />
                <div className="h-9 w-20 rounded bg-muted" />
              </div>
            ))}
          </div>
          <div className="rounded-xl border p-5 space-y-4">
            <div className="h-5 w-40 rounded bg-muted" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="size-12 rounded-full bg-muted" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-2/3 rounded bg-muted" />
                    <div className="h-3 w-1/2 rounded bg-muted" />
                  </div>
                  <div className="h-9 w-24 rounded bg-muted" />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}