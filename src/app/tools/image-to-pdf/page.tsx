import ImageToPdf from "@/components/ImageToPdf";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Image to PDF Converter Online (JPG & PNG to PDF) | WebToolKit",
  description: "Convert JPG, PNG, and WEBP images to PDF documents online. Reorder images, configure A4 or Letter page margins, and download merged PDFs locally.",
  keywords: "image to pdf, jpg to pdf, png to pdf, convert image to pdf, free image to pdf converter online, photos to pdf, merge images into pdf",
};

export default function ImageToPdfPage() {
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
          Image to PDF Converter
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl">
          Convert one or multiple images (<span className="font-semibold text-slate-700">JPG, PNG, WEBP</span>) into a single clean PDF document. Reorder pages, customize margins, choose between A4 and Letter sizes, and download instantly. 100% private in your browser.
        </p>
      </div>

      <ImageToPdf />
    </main>
  );
}
