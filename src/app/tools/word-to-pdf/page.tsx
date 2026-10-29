import WordToPdf from "@/components/WordToPdf";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Word to PDF Converter Online (.docx to .pdf) | WebToolKit",
  description: "Convert Microsoft Word (.docx) documents to PDF format online for free. Preview formatting, customize orientation, and download high-quality PDFs locally with zero server uploads.",
  keywords: "word to pdf, convert word to pdf, docx to pdf, free word to pdf converter online, doc to pdf converter, convert docx to pdf locally",
};

export default function WordToPdfPage() {
  return (
    <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8">
      <div className="mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all tools
        </Link>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
          Word to PDF Converter
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl">
          Convert your <span className="font-semibold text-slate-700">Microsoft Word (.docx)</span> documents into clean, professional PDF files. Preview document headings, tables, and formatting in real-time before downloading. 100% private in your browser.
        </p>
      </div>

      <WordToPdf />
    </main>
  );
}
