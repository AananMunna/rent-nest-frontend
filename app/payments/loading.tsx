export default function PaymentsLoading() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md flex-col items-center justify-center px-4 py-16 animate-pulse">
      <div className="w-full rounded-xl border text-center p-6 space-y-5">
        <div className="mx-auto size-14 rounded-full bg-muted" />
        <div className="space-y-2">
          <div className="mx-auto h-7 w-48 rounded bg-muted" />
          <div className="mx-auto h-4 w-64 rounded bg-muted" />
        </div>
        <div className="h-11 w-full rounded bg-muted" />
      </div>
    </div>
  );
}