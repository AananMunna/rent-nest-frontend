export default function ProfileLoading() {
  return (
    <div className="max-w-2xl animate-pulse">
      <div className="space-y-2">
        <div className="h-8 w-56 rounded bg-muted" />
        <div className="h-4 w-64 rounded bg-muted" />
      </div>

      <div className="mt-6 rounded-xl border p-5 space-y-5">
        <div className="space-y-2">
          <div className="h-5 w-32 rounded bg-muted" />
          <div className="h-4 w-52 rounded bg-muted" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-4 w-28 rounded bg-muted" />
              <div className="h-10 w-full rounded bg-muted" />
            </div>
          ))}
        </div>
        <div className="h-11 w-40 rounded bg-muted" />
      </div>
    </div>
  );
}