export default function AdminPropertiesLoading() {
  return (
    <div className="animate-pulse">
      <div className="space-y-2">
        <div className="h-8 w-56 rounded bg-muted" />
        <div className="h-4 w-64 rounded bg-muted" />
      </div>

      <div className="mt-6 rounded-xl border overflow-hidden">
        <div className="border-b p-4">
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-4 rounded bg-muted" />
            ))}
          </div>
        </div>
        <div>
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 border-b p-4 last:border-0 items-center">
              <div className="space-y-2">
                <div className="h-4 w-40 rounded bg-muted" />
                <div className="h-3 w-28 rounded bg-muted" />
              </div>
              <div className="h-4 w-28 rounded bg-muted" />
              <div className="h-4 w-20 rounded bg-muted" />
              <div className="h-6 w-24 rounded-full bg-muted" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <div className="h-10 w-72 rounded bg-muted" />
      </div>
    </div>
  );
}