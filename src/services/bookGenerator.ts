import { generateAiBook } from './aiService';
import { Book, BookConfig } from '../types';

export async function generateBook(
  config: BookConfig,
  onProgress?: (step: string) => void
): Promise<Book> {
  const result = await generateAiBook(config, onProgress);
  return result.book;
}
