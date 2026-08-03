export default function RegisterLoading() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md flex-col items-center justify-center px-4 py-10 animate-pulse">
      <div className="mb-6 h-8 w-32 rounded bg-muted" />
      <div className="w-full rounded-xl border p-6 space-y-6">
        <div className="space-y-2">
          <div className="h-7 w-52 rounded bg-muted" />
          <div className="h-4 w-60 rounded bg-muted" />
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="h-4 w-20 rounded bg-muted" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-20 rounded-xl bg-muted" />
              <div className="h-20 rounded-xl bg-muted" />
            </div>
          </div>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-4 w-24 rounded bg-muted" />
              <div className="h-10 w-full rounded bg-muted" />
            </div>
          ))}
          <div className="h-11 w-full rounded bg-muted" />
          <div className="mx-auto h-4 w-52 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}