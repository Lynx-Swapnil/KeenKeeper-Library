'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaEnvelope, FaIdBadge, FaArrowLeft } from 'react-icons/fa6';
import defaultUserImage from '@/assets/defaultUserImage.jpg';
import { ensureBookSessionStore } from '@/lib/book-session';

export default function ProfileClient({ user }) {
  const [borrowedCount, setBorrowedCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const displayPhoto = user?.image || defaultUserImage;

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

    const readCount = (key) => {
      try {
        const session = ensureBookSessionStore();
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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.1),transparent_34%),linear-gradient(180deg,#fffaf5_0%,#fffdfb_42%,#fff7ed_100%)] py-8 sm:py-12 px-4 lg:px-0">
      <div className="mx-auto max-w-4xl">
        {/* Back Navigation */}
        <Link
          href="/"
          className="mb-6 sm:mb-8 inline-flex items-center gap-1 sm:gap-2 font-medium text-orange-600 hover:text-orange-700 text-xs sm:text-sm"
        >
          <FaArrowLeft aria-hidden="true" className="text-xs sm:text-sm" />
          Back to Home
        </Link>

        {/* Profile Banner */}
        <section className="mb-6 sm:mb-8 overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-4xl border border-orange-200 bg-white/85 shadow-[0_24px_80px_rgba(249,115,22,0.12)] backdrop-blur-sm">
          <div className="bg-linear-to-r from-orange-500 via-amber-500 to-rose-500 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-8 text-white">
            <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center">
                <div className="relative h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 overflow-hidden rounded-full border-3 sm:border-4 border-white/90 bg-white/20 shadow-lg shrink-0">
                  <Image
                    src={displayPhoto}
                    alt={user.name || 'Profile'}
                    fill
                    sizes="112px"
                    className="object-cover"
                    unoptimized={typeof displayPhoto === 'string' && displayPhoto.startsWith('http')}
                  />
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
                    {user.name || 'User'}
                  </h1>
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm text-white/90">
                    <FaEnvelope aria-hidden="true" className="text-xs sm:text-sm" />
                    <span className="truncate">{user.email}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/my-profile/update"
                className="inline-flex rounded-full bg-white px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-slate-950 transition hover:bg-orange-50 w-fit"
              >
                Update Information
              </Link>
            </div>
          </div>
        </section>

        {/* Profile Details Grid */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
          <div className="rounded-lg sm:rounded-2xl lg:rounded-[1.75rem] border border-white/70 bg-white/90 p-4 sm:p-6 lg:p-8 shadow-sm backdrop-blur">
            <h2 className="mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-slate-950">
              <FaIdBadge className="text-orange-600 text-sm sm:text-lg" aria-hidden="true" />
              Account Information
            </h2>

            <div className="space-y-4 sm:space-y-6">
              {/* Email */}
              <div>
                <label className="mb-2 block text-xs sm:text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <p className="rounded-lg sm:rounded-xl lg:rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-slate-900 truncate">
                  {user.email}
                </p>
              </div>

              {/* Full Name */}
              <div>
                <label className="mb-2 block text-xs sm:text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <p className="rounded-lg sm:rounded-xl lg:rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-slate-900">
                  {user.name || 'Not provided'}
                </p>
              </div>

              {/* Account Created */}
              <div>
                <label className="mb-2 block text-xs sm:text-sm font-medium text-slate-700">
                  Account Created
                </label>
                <p className="rounded-lg sm:rounded-xl lg:rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-slate-900">
                  {formatDate(user.createdAt)}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-1">
            <div className="rounded-lg sm:rounded-2xl lg:rounded-[1.75rem] border border-white/70 bg-white/90 p-4 sm:p-6 lg:p-8 text-center shadow-sm backdrop-blur">
              
              <div className="mb-2 text-3xl sm:text-4xl font-bold text-orange-600">{borrowedCount}</div>
              <h3 className="mb-2 sm:mb-3 text-sm sm:text-lg lg:text-lg font-semibold text-slate-950">
                Books Borrowed
              </h3>
              <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-slate-600">
                Track your borrowing history
              </p>
              <Link
                href="/my-profile/borrowing-history"
                className="inline-block text-xs sm:text-sm font-medium text-orange-600 hover:text-orange-700 transition"
              >
                View History →
              </Link>
            </div>

            <div className="rounded-lg sm:rounded-2xl lg:rounded-[1.75rem] border border-white/70 bg-white/90 p-4 sm:p-6 lg:p-8 text-center shadow-sm backdrop-blur">
              
              <div className="mb-2 text-3xl sm:text-4xl font-bold text-rose-600">{wishlistCount}</div>
              <h3 className="mb-2 sm:mb-3 text-sm sm:text-lg lg:text-lg font-semibold text-slate-950">
                Wishlist Items
              </h3>
              <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-slate-600">
                Books you want to read
              </p>
              <Link
                href="/my-profile/wishlist"
                className="inline-block text-xs sm:text-sm font-medium text-rose-600 hover:text-rose-700 transition"
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
