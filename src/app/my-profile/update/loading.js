export default function Loading() {
  return (
    <main className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
      <div className="mx-auto max-w-2xl flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-t-orange-500 border-slate-200 animate-spin" />
          <p className="text-sm text-slate-700">Loading update form — fetching your profile data…</p>
        </div>
      </div>
    </main>
  );
}
