export default function Loading() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.06),_transparent_34%),linear-gradient(180deg,_#fffaf5_0%,_#fffdfb_42%,_#fff7ed_100%)] py-12 px-4">
      <div className="mx-auto max-w-4xl flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-t-orange-500 border-slate-200 animate-spin" />
          <p className="text-sm text-slate-700">Loading profile — fetching your account information…</p>
        </div>
      </div>
    </main>
  );
}
