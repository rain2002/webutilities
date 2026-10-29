import PdfToWord from "@/components/PdfToWord";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free PDF to Word Converter Online (.docx) | WebToolKit",
  description: "Convert PDF documents to editable Microsoft Word (.docx) files online. 100% private in-browser text and layout extraction with zero server uploads.",
  keywords: "pdf to word, convert pdf to word, pdf to docx, free pdf to word converter online, pdf to doc converter, extract text from pdf",
};

export default function PdfToWordPage() {
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
          PDF to Word Converter
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl">
          Convert your PDF documents into fully editable <span className="font-semibold text-slate-700">Microsoft Word (.docx)</span> files. Edit extracted text directly in your browser and download clean, formatted Word files without uploading your private documents to third-party servers.
        </p>
      </div>

      <PdfToWord />
    </main>
  );
}
