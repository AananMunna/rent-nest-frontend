export default function RootLoading() {
  return (
    <div className="animate-pulse">
      <section className="border-b bg-gradient-to-b from-accent/30 to-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <div className="mx-auto h-7 w-52 rounded-full bg-muted" />
            <div className="mx-auto h-12 w-11/12 rounded-xl bg-muted sm:h-16" />
            <div className="mx-auto h-6 w-full max-w-2xl rounded-xl bg-muted" />
            <div className="mx-auto flex max-w-xl gap-2">
              <div className="h-11 flex-1 rounded-lg bg-muted" />
              <div className="h-11 w-24 rounded-lg bg-muted" />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-9 w-24 rounded-full bg-muted" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="rounded-xl border p-6">
              <div className="mb-4 size-10 rounded-lg bg-muted" />
              <div className="h-5 w-32 rounded bg-muted" />
              <div className="mt-3 h-4 w-full rounded bg-muted" />
              <div className="mt-2 h-4 w-5/6 rounded bg-muted" />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div className="space-y-2">
            <div className="h-8 w-56 rounded bg-muted" />
            <div className="h-4 w-64 rounded bg-muted" />
          </div>
          <div className="h-9 w-28 rounded bg-muted" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
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
      </section>
    </div>
  );
}