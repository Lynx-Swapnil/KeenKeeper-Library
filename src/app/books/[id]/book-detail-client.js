'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import Toast from '@/components/toast';

function ensureSessionStore() {
  if (typeof window === 'undefined') return null;
  if (!window.__keenkeeper_session) {
    window.__keenkeeper_session = { borrowed: {}, wishlist: {} };
  }
  return window.__keenkeeper_session;
}

function addBookToSession(storeKey, userEmail, bookId) {
  const session = ensureSessionStore();
  if (!session || !userEmail) return;
  if (!session[storeKey][userEmail]) session[storeKey][userEmail] = [];
  const list = session[storeKey][userEmail];
  if (!list.includes(bookId)) list.push(bookId);
}

export default function BookDetailClient({ book, isAuthenticated, userEmail }) {
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [showToast, setShowToast] = useState(false);
  const [isBorrowDisabled, setIsBorrowDisabled] = useState(false);
  const [isWishlistDisabled, setIsWishlistDisabled] = useState(false);

  const handleBorrow = async () => {
    if (!isAuthenticated) {
      setToastMessage('Please log in to borrow books');
      setToastType('warning');
      setShowToast(true);
      setTimeout(() => {
        router.push('/login');
      }, 1500);
      return;
    }

    setToastMessage(`"${book.title}" has been added to your borrowing queue!`);
    setToastType('success');
    setShowToast(true);

    addBookToSession('borrowed', userEmail, book.id);
    setIsBorrowDisabled(true);
  };

  const handleAddWishlist = async () => {
    if (!isAuthenticated) {
      setToastMessage('Please log in to add to wishlist');
      setToastType('warning');
      setShowToast(true);
      setTimeout(() => {
        router.push('/login');
      }, 1500);
      return;
    }

    setToastMessage(`"${book.title}" added to your wishlist!`);
    setToastType('success');
    setShowToast(true);

    addBookToSession('wishlist', userEmail, book.id);
    setIsWishlistDisabled(true);
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.1),_transparent_34%),linear-gradient(180deg,_#fffaf5_0%,_#fffdfb_42%,_#fff7ed_100%)] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/books"
          className="mb-8 inline-flex items-center font-medium text-orange-600 hover:text-orange-700"
        >
          <svg
            className="mr-2 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to All Books
        </Link>

        {/* Book Details */}
        <div className="overflow-hidden rounded-[2rem] border border-orange-200 bg-white/90 shadow-[0_24px_80px_rgba(249,115,22,0.12)] backdrop-blur-sm">
          <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-3">
            {/* Book Image */}
            <div className="md:col-span-1">
              <div className="relative aspect-square w-full overflow-hidden rounded-[1.5rem] border border-orange-100 bg-orange-50">
                {book.image_url ? (
                  <Image
                    src={book.image_url}
                    alt={book.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-100 via-amber-50 to-rose-100">
                    <span className="text-sm font-medium text-orange-500">No Image</span>
                  </div>
                )}
              </div>
            </div>

            {/* Book Info */}
            <div className="md:col-span-2">
              <h1 className="mb-2 text-4xl font-bold tracking-tight text-slate-950">{book.title}</h1>
              <p className="mb-4 text-xl text-slate-600">by {book.author}</p>

              {/* Category Badge */}
              {book.category && (
                <div className="mb-6">
                  <span className="inline-block rounded-full border border-orange-200 bg-orange-50 px-4 py-1 text-sm font-semibold text-orange-700">
                    {book.category}
                  </span>
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <h2 className="mb-3 text-xl font-semibold text-slate-950">Description</h2>
                <p className="leading-relaxed text-slate-700">{book.description}</p>
              </div>

              {/* Availability */}
              <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-amber-900">
                  <span className="font-semibold">Available Copies:</span>{' '}
                  {book.available_quantity}
                </p>
              </div>

              {/* Auth Status Notice */}
              {!isAuthenticated && (
                <div className="mb-6 rounded-2xl border border-orange-200 bg-orange-50 p-4">
                  <p className="text-amber-900">
                    <span className="font-semibold">Log in required</span> to borrow this book
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                {book.available_quantity > 0 ? (
                  <button
                    onClick={handleBorrow}
                    disabled={isBorrowDisabled}
                    className={
                      isBorrowDisabled
                        ? "cursor-not-allowed rounded-full bg-slate-200 px-6 py-3 font-semibold text-slate-500"
                        : "rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 px-6 py-3 font-semibold text-white shadow-[0_12px_30px_rgba(249,115,22,0.25)] transition hover:brightness-105"
                    }
                  >
                    {isBorrowDisabled ? "Borrowed" : "Borrow This Book"}
                  </button>
                ) : (
                  <button
                    disabled
                    className="cursor-not-allowed rounded-full bg-slate-200 px-6 py-3 font-semibold text-slate-500"
                  >
                    Currently Unavailable
                  </button>
                )}
                <button
                  onClick={handleAddWishlist}
                  disabled={isWishlistDisabled}
                  className={
                    isWishlistDisabled
                      ? "cursor-not-allowed rounded-full border-2 border-orange-200 bg-slate-100 px-6 py-3 font-semibold text-slate-400"
                      : "rounded-full border-2 border-orange-500 px-6 py-3 font-semibold text-orange-600 transition hover:bg-orange-50"
                  }
                >
                  {isWishlistDisabled ? "Wishlisted" : "Add to Wishlist"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </main>
  );
}
