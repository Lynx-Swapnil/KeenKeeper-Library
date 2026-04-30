import localBooks from "../data/books.json";
import { getCollection } from "./mongodb";

function normalizeBook(book) {
  return {
    id: book.id ?? book._id?.toString(),
    title: book.title,
    author: book.author,
    description: book.description,
    category: book.category,
    available_quantity: book.available_quantity,
    image_url: book.image_url,
  };
}

export async function getFeaturedBooks(limit = 4) {
  try {
    const collection = await getCollection("books");
    const books = await collection
      .find({})
      .sort({ _id: 1 })
      .limit(limit)
      .toArray();

    if (books.length > 0) {
      return books.map(normalizeBook);
    }
  } catch {
    // Fall back to local seed data when MongoDB is unavailable.
  }

  return localBooks.slice(0, limit);
}
