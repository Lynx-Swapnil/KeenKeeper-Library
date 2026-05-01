'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function UpdateProfileForm({ user }) {
  const router = useRouter();
  const [name, setName] = useState(user?.name || '');
  const [image, setImage] = useState(user?.image || '');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!name.trim() || !image.trim()) {
      setErrorMessage('Please provide both name and image URL.');
      return;
    }

    try {
      setIsUpdating(true);

      const result = await authClient.updateUser({
        name: name.trim(),
        image: image.trim(),
      });

      if (result?.error) {
        setErrorMessage(result.error.message || 'Failed to update user information.');
        return;
      }

      setSuccessMessage('Information updated successfully. Redirecting...');
      router.refresh();
      setTimeout(() => {
        router.push('/my-profile');
      }, 900);
    } catch (error) {
      setErrorMessage(error?.message || 'Failed to update user information.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.1),_transparent_34%),linear-gradient(180deg,_#fffaf5_0%,_#fffdfb_42%,_#fff7ed_100%)] py-8 sm:py-12 px-4 lg:px-0">
      <div className="max-w-2xl mx-auto animate__animated animate__fadeInUp">
        <Link
          href="/my-profile"
          className="mb-6 sm:mb-8 inline-flex items-center gap-1 sm:gap-2 font-medium text-orange-600 hover:text-orange-700 text-xs sm:text-sm"
        >
          <svg
            className="w-3 h-3 sm:w-5 sm:h-5"
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
          Back to My Profile
        </Link>

        <section className="rounded-2xl sm:rounded-3xl lg:rounded-[2rem] border border-orange-200 bg-white/90 p-5 sm:p-6 lg:p-8 shadow-[0_24px_80px_rgba(249,115,22,0.12)] backdrop-blur-sm">
          <h1 className="mb-2 text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">Update Information</h1>
          <p className="mb-6 sm:mb-8 text-xs sm:text-sm text-slate-600">
            Change your display name and profile image using BetterAuth user update.
          </p>

          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your full name"
                className="w-full rounded-lg sm:rounded-xl lg:rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 sm:px-4 sm:py-3 text-sm text-slate-900 outline-none transition focus:border-orange-300 focus:bg-white"
              />
            </div>

            <div>
              <label htmlFor="image" className="mb-2 block text-xs sm:text-sm font-medium text-slate-700">
                Image URL
              </label>
              <input
                id="image"
                type="url"
                value={image}
                onChange={(event) => setImage(event.target.value)}
                placeholder="https://example.com/avatar.png"
                className="w-full rounded-lg sm:rounded-xl lg:rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 sm:px-4 sm:py-3 text-sm text-slate-900 outline-none transition focus:border-orange-300 focus:bg-white"
              />
            </div>

            {errorMessage ? (
              <p className="rounded-lg sm:rounded-xl lg:rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-rose-700">
                {errorMessage}
              </p>
            ) : null}

            {successMessage ? (
              <p className="rounded-lg sm:rounded-xl lg:rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-emerald-700">
                {successMessage}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isUpdating}
              className="w-full rounded-full bg-slate-950 px-4 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isUpdating ? 'Updating...' : 'Update Information'}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
