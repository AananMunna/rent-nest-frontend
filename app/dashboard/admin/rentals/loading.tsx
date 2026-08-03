export default function AdminRentalsLoading() {
  return (
    <div className="animate-pulse">
      <div className="space-y-2">
        <div className="h-8 w-56 rounded bg-muted" />
        <div className="h-4 w-64 rounded bg-muted" />
      </div>

      <div className="mt-6 rounded-xl border overflow-hidden">
        <div className="border-b p-4">
          <div className="grid grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-4 rounded bg-muted" />
            ))}
          </div>
        </div>
        <div>
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="grid grid-cols-6 gap-4 border-b p-4 last:border-0 items-center">
              {Array.from({ length: 6 }).map((__, cellIndex) => (
                <div key={cellIndex} className="h-4 rounded bg-muted" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}