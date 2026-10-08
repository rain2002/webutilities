import QrCodeGenerator from "@/components/QrCodeGenerator";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free QR Code Generator | WebToolKit",
  description: "Create downloadable QR codes for URLs, text, and Wi-Fi networks instantly.",
};

export default function QrGeneratorPage() {
  return (
    <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all tools
        </Link>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
          QR Code Generator
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
          Instantly generate high-quality QR codes for your URLs, text, or Wi-Fi networks. The code is generated completely offline in your browser for absolute privacy.
        </p>
      </div>

      <QrCodeGenerator />
    </main>
  );
}
