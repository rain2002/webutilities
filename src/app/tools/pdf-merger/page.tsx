import PdfMerger from "@/components/PdfMerger";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Combine PDF Files Online | WebToolKit",
  description: "Merge multiple PDF files into one document instantly. Processed locally for 100% privacy.",
};

export default function PdfMergerPage() {
  return (
    <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all tools
        </Link>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          PDF Merger
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Combine multiple PDF files into a single document instantly. 100% private — your highly sensitive PDF files are processed directly on your device and never uploaded to any server.
        </p>
      </div>

      <PdfMerger />
    </main>
  );
}
