import PdfSplitter from "@/components/PdfSplitter";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Splitter Online | WebToolKit",
  description: "Extract specific pages or split large PDFs into multiple smaller documents for free.",
};

export default function Page() {
  return (
    <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Link>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">PDF Splitter</h1>
      </div>
      <PdfSplitter />
    </main>
  );
}
