import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Book, BookPage } from '../types';

export interface PdfGenerationOptions {
  includeCover?: boolean;
  includeToc?: boolean;
  includePageNumbers?: boolean;
  quality?: 'standard' | 'high' | 'ultra'; // scale 1, 2, or 3
  onProgress?: (progress: { current: number; total: number; message: string }) => void;
}

/**
 * Escapes string for HTML insertion
 */
function escapeHtml(str: string = ''): string {
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

/**
 * Generates a professional A4 PDF with Cover, TOC, running Page Numbers, and ultra-high resolution output.
 */
export async function generateProfessionalPdf(
  book: Book,
  options: PdfGenerationOptions = {}
): Promise<Blob> {
  const {
    includeCover = true,
    includeToc = true,
    includePageNumbers = true,
    quality = 'high',
    onProgress,
  } = options;

  const scale = quality === 'ultra' ? 3 : quality === 'high' ? 2 : 1.5;

  // Prepare temporary hidden DOM element for PDF rendering
  const renderHost = document.createElement('div');
  renderHost.style.position = 'absolute';
  renderHost.style.left = '-9999px';
  renderHost.style.top = '-9999px';
  renderHost.style.width = '794px'; // A4 width at 96 DPI
  renderHost.style.backgroundColor = '#ffffff';
  document.body.appendChild(renderHost);

  try {
    // Collect all pages to render
    const pdfPages: { type: 'cover' | 'toc' | 'content'; title: string; pageNumber?: number; html: string }[] = [];

    // 1. Cover Page
    if (includeCover) {
      const coverHtml = `
        <div style="width: 794px; min-height: 1123px; padding: 48px; box-sizing: border-box; background: linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4c1d95 100%); color: white; display: flex; flex-direction: column; justify-content: space-between; position: relative; font-family: 'Fredoka', sans-serif;">
          <!-- Decorative Corner Accents -->
          <div style="position: absolute; top: 20px; left: 20px; right: 20px; bottom: 20px; border: 4px dashed rgba(255,255,255,0.2); border-radius: 24px; pointer-events: none;"></div>

          <!-- Cover Header -->
          <div style="text-align: center; margin-top: 30px;">
            <div style="display: inline-block; padding: 6px 20px; background: #fbbf24; color: #1e1b4b; font-weight: 900; font-size: 14px; border-radius: 999px; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 20px;">
              Kids Educational Printable Worksheets
            </div>
            <h1 style="font-size: 42px; font-weight: 900; margin: 0; line-height: 1.1; text-transform: uppercase; letter-spacing: -0.5px; color: #ffffff;">
              ${escapeHtml(book.title)}
            </h1>
            <p style="font-size: 18px; color: #c7d2fe; margin-top: 12px; font-weight: 600;">
              ${escapeHtml(book.category)} • Age ${escapeHtml(book.ageGroup)}
            </p>
          </div>

          <!-- Main Center Graphic/Hero -->
          <div style="margin: 40px auto; text-align: center; background: rgba(255,255,255,0.08); border: 2px solid rgba(255,255,255,0.15); border-radius: 32px; padding: 36px; width: 85%;">
            <div style="font-size: 100px; margin-bottom: 16px;">
              ${book.categoryKey.includes('urdu') ? '🇵🇰' : book.categoryKey.includes('numbers') ? '🔢' : book.categoryKey.includes('alphabet') ? '🔤' : '🎨'}
            </div>
            <div style="font-size: 24px; font-weight: 800; color: #fde047; text-transform: uppercase;">
              ${escapeHtml(book.category)} • Age Group ${escapeHtml(book.ageGroup)}
            </div>
          </div>

          <!-- Cover Footer -->
          <div style="text-align: center; border-t: 2px border-indigo-400/30; padding-top: 20px;">
            <p style="font-size: 16px; font-weight: 800; color: #e0e7ff; margin: 0;">
              Total Pages: ${book.pages.length} Interactive Worksheets
            </p>
            <p style="font-size: 12px; color: #a5b4fc; margin-top: 6px;">
              Created with KidsBook AI • High-Resolution Vector Printable
            </p>
          </div>
        </div>
      `;
      pdfPages.push({ type: 'cover', title: 'Cover Page', html: coverHtml });
    }

    // Calculate total pages including TOC
    const totalContentPages = book.pages.length;

    // 2. Table of Contents (TOC) Page
    if (includeToc && totalContentPages > 0) {
      const tocItemsHtml = book.pages
        .map((pg, idx) => `
          <div style="display: flex; items-center; justify-content: space-between; padding: 10px 16px; margin-bottom: 8px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; font-family: sans-serif;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="width: 28px; height: 28px; background: #4f46e5; color: white; border-radius: 8px; font-weight: 800; font-size: 12px; display: flex; items-center; justify-content: center; align-items: center; text-align: center; line-height: 28px;">
                ${idx + 1}
              </span>
              <div>
                <span style="font-weight: 800; font-size: 14px; color: #0f172a;">${escapeHtml(pg.title)}</span>
                <span style="font-size: 11px; color: #64748b; margin-left: 8px; text-transform: uppercase; font-weight: 700;">[${pg.type}]</span>
              </div>
            </div>
            <span style="font-weight: 800; font-size: 14px; color: #4f46e5; font-family: monospace;">Page ${idx + 1}</span>
          </div>
        `)
        .join('');

      const tocHtml = `
        <div style="width: 794px; min-height: 1123px; padding: 48px; box-sizing: border-box; background: #ffffff; color: #0f172a; display: flex; flex-direction: column; justify-content: space-between; font-family: 'Fredoka', sans-serif;">
          <div>
            <div style="text-align: center; border-bottom: 3px solid #4f46e5; padding-bottom: 16px; margin-bottom: 24px;">
              <span style="padding: 4px 14px; background: #e0e7ff; color: #3730a3; font-weight: 800; font-size: 11px; border-radius: 999px; text-transform: uppercase;">
                Worksheet Overview
              </span>
              <h2 style="font-size: 32px; font-weight: 900; color: #1e1b4b; margin: 8px 0 0 0; text-transform: uppercase;">
                Table of Contents (فہرست)
              </h2>
            </div>
            <div style="margin-top: 16px;">
              ${tocItemsHtml}
            </div>
          </div>
          <div style="text-align: center; border-top: 1px solid #e2e8f0; pt-12; font-size: 12px; color: #94a3b8; font-weight: 600;">
            ${escapeHtml(book.title)} • Table of Contents
          </div>
        </div>
      `;
      pdfPages.push({ type: 'toc', title: 'Table of Contents', html: tocHtml });
    }

    // 3. Content Pages
    // Clone live print-page elements or build crisp DOM pages
    const printContainer = document.querySelector('.print-only');
    const pageNodes = printContainer ? Array.from(printContainer.querySelectorAll('.print-page')) : [];

    for (let i = 0; i < book.pages.length; i++) {
      const pageData = book.pages[i];
      const pageElement = pageNodes[i];
      let innerHtml = pageElement ? pageElement.outerHTML : '';

      if (!innerHtml) {
        // Fallback rendered structure if print container isn't rendered
        innerHtml = `
          <div class="print-page" style="width: 794px; min-height: 1123px; padding: 40px; box-sizing: border-box; background: white; border: 1px solid #e2e8f0; display: flex; flex-direction: column; justify-content: space-between; font-family: sans-serif;">
            <div style="text-align: center; padding: 20px;">
              <h2 style="font-size: 36px; font-weight: 900; color: #0f172a;">${escapeHtml(pageData.title)}</h2>
              <p style="font-size: 18px; color: #475569;">Word: ${escapeHtml(pageData.word || pageData.mainCharacter || '')}</p>
              ${pageData.imageUrl ? `<img src="${pageData.imageUrl}" style="max-height: 400px; max-width: 90%; margin: 20px auto; border: 2px solid #0f172a; border-radius: 12px;" />` : `<div style="font-size: 120px; margin: 40px 0;">${pageData.imageEmoji || '🎨'}</div>`}
            </div>
          </div>
        `;
      }

      pdfPages.push({
        type: 'content',
        title: pageData.title,
        pageNumber: i + 1,
        html: innerHtml,
      });
    }

    // Initialize jsPDF A4 portrait
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = doc.internal.pageSize.getWidth(); // 210mm
    const pdfHeight = doc.internal.pageSize.getHeight(); // 297mm

    let contentPageIndex = 0;

    for (let index = 0; index < pdfPages.length; index++) {
      const pageObj = pdfPages[index];

      if (onProgress) {
        onProgress({
          current: index + 1,
          total: pdfPages.length,
          message: `Rendering ${pageObj.title} (${index + 1} / ${pdfPages.length})...`,
        });
      }

      // Render page HTML into host element
      renderHost.innerHTML = pageObj.html;

      // Add running footer page number for content pages if option enabled
      if (includePageNumbers && pageObj.type === 'content') {
        contentPageIndex++;
        const footerDiv = document.createElement('div');
        footerDiv.style.position = 'absolute';
        footerDiv.style.bottom = '16px';
        footerDiv.style.left = '40px';
        footerDiv.style.right = '40px';
        footerDiv.style.display = 'flex';
        footerDiv.style.justifyContent = 'space-between';
        footerDiv.style.alignItems = 'center';
        footerDiv.style.fontSize = '12px';
        footerDiv.style.fontFamily = 'sans-serif';
        footerDiv.style.color = '#64748b';
        footerDiv.style.borderTop = '1px solid #e2e8f0';
        footerDiv.style.paddingTop = '8px';
        footerDiv.innerHTML = `
          <span>${escapeHtml(book.title)}</span>
          <span style="font-weight: 800; color: #4f46e5; font-family: monospace;">Page ${contentPageIndex} of ${totalContentPages}</span>
          <span>KidsBook AI</span>
        `;
        renderHost.appendChild(footerDiv);
      }

      // Capture element with html2canvas at specified scale
      const canvas = await html2canvas(renderHost, {
        scale: scale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      if (index > 0) {
        doc.addPage();
      }

      doc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    }

    // Clean up render host
    document.body.removeChild(renderHost);

    // Output PDF Blob
    return doc.output('blob');
  } catch (err) {
    if (document.body.contains(renderHost)) {
      document.body.removeChild(renderHost);
    }
    console.error('PDF generation error:', err);
    throw err;
  }
}
