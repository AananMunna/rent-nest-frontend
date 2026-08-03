export default function AdminCategoriesLoading() {
  return (
    <div className="animate-pulse max-w-3xl">
      <div className="space-y-2">
        <div className="h-8 w-48 rounded bg-muted" />
        <div className="h-4 w-80 rounded bg-muted" />
      </div>

      <div className="mt-6 rounded-xl border p-5 space-y-5">
        <div className="space-y-2">
          <div className="h-5 w-40 rounded bg-muted" />
          <div className="h-10 w-full rounded bg-muted" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between gap-4 rounded-lg border p-4">
              <div className="space-y-2">
                <div className="h-4 w-36 rounded bg-muted" />
                <div className="h-3 w-56 rounded bg-muted" />
              </div>
              <div className="h-9 w-24 rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}