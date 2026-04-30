import { getCollection } from '@/lib/mongodb';
import localBooks from '@/data/books.json';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import BookDetailClient from './book-detail-client';

export async function generateMetadata({ params }) {
  const { id } = await params;
  let book = null;
  
  try {
    const booksCollection = await getCollection('books');
    const bookId = parseInt(id, 10);
    book = await booksCollection.findOne({ id: bookId });
  } catch (error) {
    console.error('Error generating metadata:', error);
  }

  // Fall back to local data
  if (!book) {
    book = localBooks.find((b) => b.id === parseInt(id, 10));
  }

  if (book) {
    return {
      title: `${book.title} | Online Book Borrowing Platform`,
      description: book.description || 'Book details',
    };
  }

  return {
    title: 'Book Details | Online Book Borrowing Platform',
  };
}

export default async function BookDetailPage({ params }) {
  const { id } = await params;
  let book = null;
  let error = null;
  let session = null;

  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });
  } catch (err) {
    console.error('Error checking auth:', err);
  }

  if (!session?.user) {
    redirect('/login');
  }

  try {
    const booksCollection = await getCollection('books');
    // Convert id to number for lookup
    const bookId = parseInt(id, 10);
    book = await booksCollection.findOne({ id: bookId });
  } catch (err) {
    console.error('Error fetching book:', err);
  }

  // Fall back to local data
  if (!book) {
    book = localBooks.find((b) => b.id === parseInt(id, 10));
  }

  if (!book) {
    error = 'Book not found';
  }

  if (error || !book) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">{error || 'Book not found'}</p>
            <Link
              href="/books"
              className="inline-block px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Back to All Books
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <BookDetailClient
      book={book}
      isAuthenticated={true}
      userEmail={session.user.email}
    />
  );
}
