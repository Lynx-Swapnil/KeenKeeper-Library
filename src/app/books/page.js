import BooksList from './books-list';
import { getFeaturedBooks } from '@/lib/books';

export const metadata = {
  title: 'All Books | Online Book Borrowing Platform',
  description: 'Browse and search all available books',
};

export default async function BooksPage() {
  // Fetch all books (or a large limit)
  let allBooks = [];
  try {
    allBooks = await getFeaturedBooks(1000); // Fetch up to 1000 books
  } catch (error) {
    console.error('Error fetching books:', error);
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.1),_transparent_34%),linear-gradient(180deg,_#fffaf5_0%,_#fffdfb_42%,_#fff7ed_100%)] py-12 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 overflow-hidden rounded-[2rem] border border-orange-200 bg-gradient-to-br from-orange-500 via-amber-500 to-rose-500 px-6 py-10 text-white shadow-[0_24px_80px_rgba(249,115,22,0.18)] sm:px-10 lg:px-12">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex rounded-full border border-white/25 bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/90">
              All Books
            </span>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Discover your next favorite read
            </h1>
            <p className="max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
              Browse the full catalog with a theme that matches the KeenKeeper home
              experience.
            </p>
          </div>
        </div>

        {/* Books List with Search */}
        <BooksList initialBooks={allBooks} />
      </div>
    </main>
  );
}
