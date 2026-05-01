import Link from "next/link";
import BackButton from "../components/back-button";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-orange-50 px-4 py-24">
      <div className="max-w-3xl text-center">
        <div className="inline-flex items-center justify-center h-36 w-36 rounded-full bg-orange-100/60 border border-orange-200 mx-auto mb-6">
          <svg className="h-16 w-16 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M11 17h2M12 7v6" />
            <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
          </svg>
        </div>

        <h1 className="text-4xl font-semibold text-slate-900">Page not found</h1>
        <p className="mt-4 text-sm text-slate-600">
          Looks like the page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-orange-600"
          >
            Go home
          </Link>

          <BackButton className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
            Go back
          </BackButton>
        </div>

        <p className="mt-6 text-xs text-slate-500">If you think this is an error, contact support.</p>
      </div>
    </main>
  );
}
