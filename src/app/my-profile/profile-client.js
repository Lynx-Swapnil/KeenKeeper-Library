'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaBookOpen, FaEnvelope, FaHeart, FaIdBadge, FaArrowLeft } from 'react-icons/fa6';

export default function ProfileClient({ user }) {
  const [borrowedCount, setBorrowedCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  useEffect(() => {
    if (!user?.email || typeof window === 'undefined') return;

    const session = window.__keenkeeper_session;

    const readCount = (key) => {
      try {
        if (!session || !session[key] || !session[key][user.email]) return 0;
        return Array.isArray(session[key][user.email]) ? session[key][user.email].length : 0;
      } catch {
        return 0;
      }
    };

    const syncCounts = () => {
      setBorrowedCount(readCount('borrowed'));
      setWishlistCount(readCount('wishlist'));
    };

    syncCounts();

    // Also listen for storage events in case another window changed session object
    const onStorage = () => syncCounts();
    window.addEventListener('storage', onStorage);

    // Poll briefly to pick up updates from same-page writes (since we're using an in-memory object)
    const interval = setInterval(syncCounts, 800);

    return () => {
      window.removeEventListener('storage', onStorage);
      clearInterval(interval);
    };
  }, [user?.email]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.1),_transparent_34%),linear-gradient(180deg,_#fffaf5_0%,_#fffdfb_42%,_#fff7ed_100%)] py-12 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Back Navigation */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 font-medium text-orange-600 hover:text-orange-700"
        >
          <FaArrowLeft aria-hidden="true" />
          Back to Home
        </Link>

        {/* Profile Banner */}
        <section className="mb-8 overflow-hidden rounded-[2rem] border border-orange-200 bg-white/85 shadow-[0_24px_80px_rgba(249,115,22,0.12)] backdrop-blur-sm">
          <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 px-8 py-8 text-white">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-white/90 shadow-lg bg-white/20 flex-shrink-0">
                  {user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.image}
                      alt={user.name || 'Profile'}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-white/15">
                      <FaIdBadge className="text-4xl text-white/85" aria-hidden="true" />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {user.name || 'User'}
                  </h1>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90">
                    <FaEnvelope aria-hidden="true" />
                    {user.email}
                  </div>
                </div>
              </div>

              <Link
                href="/my-profile/update"
                className="inline-flex rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-orange-50 w-fit"
              >
                Update Information
              </Link>
            </div>
          </div>
        </section>

        {/* Profile Details Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-[1.75rem] border border-white/70 bg-white/90 p-8 shadow-sm backdrop-blur">
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold tracking-tight text-slate-950">
              <FaIdBadge className="text-orange-600" aria-hidden="true" />
              Account Information
            </h2>

            <div className="space-y-6">
              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900">
                  {user.email}
                </p>
              </div>

              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900">
                  {user.name || 'Not provided'}
                </p>
              </div>

              {/* Account Created */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Account Created
                </label>
                <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900">
                  {formatDate(user.createdAt)}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <div className="rounded-[1.75rem] border border-white/70 bg-white/90 p-8 text-center shadow-sm backdrop-blur">
              
              <div className="mb-2 text-4xl font-bold text-orange-600">{borrowedCount}</div>
              <h3 className="mb-3 text-lg font-semibold text-slate-950">
                Books Borrowed
              </h3>
              <p className="mb-4 text-sm text-slate-600">
                Track your borrowing history
              </p>
              <Link
                href="/my-profile/borrowing-history"
                className="text-sm font-medium text-orange-600 hover:text-orange-700"
              >
                View History →
              </Link>
            </div>

            <div className="rounded-[1.75rem] border border-white/70 bg-white/90 p-8 text-center shadow-sm backdrop-blur">
              
              <div className="mb-2 text-4xl font-bold text-rose-600">{wishlistCount}</div>
              <h3 className="mb-3 text-lg font-semibold text-slate-950">
                Wishlist Items
              </h3>
              <p className="mb-4 text-sm text-slate-600">
                Books you want to read
              </p>
              <Link
                href="/my-profile/wishlist"
                className="text-sm font-medium text-rose-600 hover:text-rose-700"
              >
                View Wishlist →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
