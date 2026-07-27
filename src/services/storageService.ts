import { Book } from '../types';

const STORAGE_KEY = 'kidsbook_ai_saved_books_v1';
const RECENT_KEY = 'kidsbook_ai_recent_book_v1';

export function getSavedBooks(): Book[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse saved books from localStorage', e);
    return [];
  }
}

export function saveBook(book: Book): void {
  try {
    const books = getSavedBooks();
    const existingIndex = books.findIndex((b) => b.id === book.id);
    if (existingIndex >= 0) {
      books[existingIndex] = book;
    } else {
      books.unshift(book);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    localStorage.setItem(RECENT_KEY, JSON.stringify(book));
  } catch (e) {
    console.error('Failed to save book to localStorage', e);
  }
}

export function deleteSavedBook(id: string): Book[] {
  try {
    const books = getSavedBooks().filter((b) => b.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    return books;
  } catch (e) {
    console.error('Failed to delete book from localStorage', e);
    return [];
  }
}

export function getRecentBook(): Book | null {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}
