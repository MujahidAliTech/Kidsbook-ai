import { Book } from '../types';

/**
 * Triggers the native browser print dialog safely
 */
export function triggerBrowserPrint() {
  try {
    window.focus();
    setTimeout(() => {
      window.print();
    }, 100);
  } catch (err) {
    console.error('Print trigger error:', err);
  }
}

/**
 * Downloads a standalone, self-contained printable HTML file for the book.
 * Allows opening in any browser tab to print or save as PDF offline.
 */
export function downloadPrintableHtml(book: Book) {
  const printContainer = document.querySelector('.print-only');
  const pageElementsHtml = printContainer ? printContainer.innerHTML : '';

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(book.title)} - Printable Book</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @media print {
      @page {
        size: A4 portrait;
        margin: 0;
      }
      body {
        background: white !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      .print-page {
        width: 210mm !important;
        height: 297mm !important;
        page-break-after: always !important;
        break-after: page !important;
        box-sizing: border-box !important;
        padding: 10mm !important;
        overflow: hidden !important;
        margin: 0 !important;
        box-shadow: none !important;
      }
      .no-print {
        display: none !important;
      }
    }
    .print-page {
      width: 210mm;
      min-height: 297mm;
      margin: 20px auto;
      padding: 10mm;
      box-shadow: 0 4px 20px rgba(0,0,0,0.12);
      background: white;
      box-sizing: border-box;
      border-radius: 8px;
    }
  </style>
</head>
<body class="bg-slate-100 min-h-screen text-slate-800 font-sans">
  <div class="no-print bg-indigo-900 text-white p-4 sticky top-0 z-50 shadow-md flex items-center justify-between">
    <div class="flex items-center gap-3">
      <span class="text-2xl">🖨️</span>
      <div>
        <h1 class="font-bold text-base leading-tight">${escapeHtml(book.title)}</h1>
        <p class="text-xs text-indigo-200">KidsBook AI Printable Mini-Book (${book.pages.length} Pages)</p>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <button onclick="window.print()" class="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold rounded-lg shadow-sm transition-all text-sm cursor-pointer">
        🖨️ Print / Save as PDF Now
      </button>
    </div>
  </div>

  <div class="max-w-4xl mx-auto py-6 px-4">
    ${pageElementsHtml}
  </div>

  <script>
    // Trigger print dialog on load
    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        window.print();
      }, 400);
    });
  </script>
</body>
</html>`;

  const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${book.title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_printable.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function escapeHtml(str: string): string {
  return str.replace(/[&<>"']/g, (m) => {
    switch (m) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#39;';
      default: return m;
    }
  });
}
