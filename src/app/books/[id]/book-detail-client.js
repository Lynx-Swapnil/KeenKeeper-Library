'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import Toast from '@/components/toast';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import {
  addBookToSession,
  decrementAvailableCount,
  ensureBookSessionStore,
  getAvailableCount,
  isBookInSession,
} from '@/lib/book-session';

export default function BookDetailClient({ book, isAuthenticated, userEmail }) {
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [showToast, setShowToast] = useState(false);
  const [isBorrowDisabled, setIsBorrowDisabled] = useState(false);
  const [isWishlistDisabled, setIsWishlistDisabled] = useState(false);
  const [availableCount, setAvailableCount] = useState(book.available_quantity);

  useEffect(() => {
    if (!isAuthenticated || !userEmail) return;

    const syncButtonState = () => {
      setIsBorrowDisabled(isBookInSession('borrowed', userEmail, book.id));
      setIsWishlistDisabled(isBookInSession('wishlist', userEmail, book.id));
      setAvailableCount(getAvailableCount(book.id, book.available_quantity));
    };

    ensureBookSessionStore();
    syncButtonState();

    const onStorage = () => syncButtonState();
    window.addEventListener('storage', onStorage);

    const interval = setInterval(syncButtonState, 800);

    return () => {
      window.removeEventListener('storage', onStorage);
      clearInterval(interval);
    };
  }, [book.id, book.available_quantity, isAuthenticated, userEmail]);

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

    if (availableCount <= 0) {
      setToastMessage('No copies are available right now');
      setToastType('warning');
      setShowToast(true);
      return;
    }

    setToastMessage(`"${book.title}" has been added to your borrowing queue!`);
    setToastType('success');
    setShowToast(true);

    addBookToSession('borrowed', userEmail, book.id);
    decrementAvailableCount(book.id, book.available_quantity);
    setAvailableCount((current) => Math.max(0, current - 1));
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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.1),transparent_34%),linear-gradient(180deg,#fffaf5_0%,#fffdfb_42%,#fff7ed_100%)] py-8 sm:py-12 px-4 sm:px-0 lg:px-0">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/books"
          className="mb-6 sm:mb-8 inline-flex items-center gap-1 sm:gap-2 font-medium text-orange-600 hover:text-orange-700 text-xs sm:text-sm"
        >
          <svg
            className="h-3 w-3 sm:h-5 sm:w-5"
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
        <div className="overflow-hidden rounded-lg sm:rounded-2xl lg:rounded-4xl border border-orange-200 bg-white/90 shadow-[0_24px_80px_rgba(249,115,22,0.12)] backdrop-blur-sm">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 p-4 sm:p-6 lg:p-8 md:grid-cols-3">
            {/* Book Image */}
            <div className="md:col-span-1">
              <div className="relative aspect-square w-full overflow-hidden rounded-lg sm:rounded-2xl lg:rounded-3xl border border-orange-100 bg-orange-50">
                {book.image_url ? (
                  <Image
                    src={book.image_url}
                    alt={book.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-orange-100 via-amber-50 to-rose-100">
                    <span className="text-xs sm:text-sm font-medium text-orange-500">No Image</span>
                  </div>
                )}
              </div>
            </div>

            {/* Book Info */}
            <div className="md:col-span-2">
              <h1 className="mb-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-950">{book.title}</h1>
              <p className="mb-4 text-base sm:text-lg lg:text-xl text-slate-600">by {book.author}</p>

              {/* Category Badge */}
              {book.category && (
                <div className="mb-6">
                  <span className="inline-block rounded-full border border-orange-200 bg-orange-50 px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-semibold text-orange-700">
                    {book.category}
                  </span>
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <h2 className="mb-2 sm:mb-3 text-base sm:text-lg lg:text-xl font-semibold text-slate-950">Description</h2>
                <p className="text-sm sm:text-base leading-relaxed text-slate-700">{book.description}</p>
              </div>

              {/* Availability */}
              <div className="mb-6 rounded-lg sm:rounded-2xl border border-amber-200 bg-amber-50 p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-amber-900">
                  <span className="font-semibold">Available Copies:</span>{' '}
                  {availableCount}
                </p>
              </div>

              {/* Auth Status Notice */}
              {!isAuthenticated && (
                <div className="mb-6 rounded-lg sm:rounded-2xl border border-orange-200 bg-orange-50 p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-amber-900">
                    <span className="font-semibold">Log in required</span> to borrow this book
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {book.available_quantity > 0 ? (
                  <button
                    onClick={handleBorrow}
                    disabled={isBorrowDisabled || availableCount <= 0}
                    className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition ${
                      isBorrowDisabled || availableCount <= 0
                        ? "cursor-not-allowed bg-slate-200 text-slate-500"
                        : "bg-linear-to-r from-orange-500 via-amber-500 to-rose-500 text-white shadow-[0_12px_30px_rgba(249,115,22,0.25)] hover:brightness-105"
                    }`}
                  >
                    {isBorrowDisabled ? 'Borrowed' : availableCount <= 0 ? 'No Copies Left' : 'Borrow This Book'}
                  </button>
                ) : (
                  <button
                    disabled
                    className="cursor-not-allowed rounded-full bg-slate-200 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-slate-500"
                  >
                    Currently Unavailable
                  </button>
                )}
                <button
                  onClick={handleAddWishlist}
                  disabled={isWishlistDisabled}
                  className={`inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition ${
                    isWishlistDisabled
                      ? "cursor-not-allowed border-2 border-orange-200 bg-slate-100 text-slate-400"
                      : "border-2 border-orange-500 text-orange-600 hover:bg-orange-50"
                  }`}
                >
                  {isWishlistDisabled ? (
                    <FaHeart aria-hidden="true" className="text-sm sm:text-base text-orange-400" />
                  ) : (
                    <FaRegHeart aria-hidden="true" className="text-sm sm:text-base" />
                  )}
                  <span className="hidden sm:inline">{isWishlistDisabled ? "Wishlisted" : "Add to Wishlist"}</span>
                  <span className="sm:hidden">{isWishlistDisabled ? "Wishlisted" : "Wishlist"}</span>
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
