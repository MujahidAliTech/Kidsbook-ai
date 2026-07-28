import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How can I print these worksheets at home or school?",
      a: "Once your book is generated, click the 'Print / Save PDF' button in the toolbar. This opens a clean A4 print preview configured with standard page dimensions. You can either print directly to your home/school printer or select 'Save as PDF' in your browser."
    },
    {
      q: "Are these learning books free for parents and teachers?",
      a: "Yes! KidsBook AI is 100% free to use. Parents, teachers, homeschooling educators, and daycare providers can generate, customize, and print unlimited workbooks without any subscription or signup."
    },
    {
      q: "How does the Urdu language support work?",
      a: "Our app includes native support for Urdu Haroof-e-Tahajji (آ سے ی) with proper Right-To-Left (RTL) text alignment, Nastaliq typography, phonetic guidance, and Urdu word examples. You can generate pure Urdu qaida or bilingual (English + Urdu) workbooks."
    },
    {
      q: "Can I generate books on custom topics like Space or Dinosaurs?",
      a: "Yes! Select the 'Custom Topic' category, type any topic name (e.g. 'Dinosaurs', 'Vehicles', 'Islamic Good Manners', 'Solar System'), and Gemini AI will construct a tailored multi-page educational activity book."
    },
    {
      q: "Is my data saved safely?",
      a: "All generated books are automatically stored safely in your browser's local storage (My Books). You can re-open, edit, or reprint them anytime on the same device without creating an account."
    },
    {
      q: "What age group are these workbooks designed for?",
      a: "Workbooks are specially structured for children aged 2 to 7 years (Toddler, Nursery, KG, and Grade 1). You can choose the exact age group during generation so fonts, line sizes, and activity complexity adapt automatically."
    }
  ];

  return (
    <section className="py-12 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold rounded-full border border-indigo-200 dark:border-indigo-800 mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Questions Parents & Teachers Ask
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Everything you need to know about generating, printing, and customizing learning workbooks.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-2xs transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <span className="text-sm sm:text-base pr-2">{faq.q}</span>
                <span className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
