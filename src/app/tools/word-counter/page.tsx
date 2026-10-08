import WordCounter from "@/components/WordCounter";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word & Character Counter Online | WebToolKit",
  description: "Instantly count words, characters, sentences, and paragraphs. Real-time text metrics.",
};

export default function WordCounterPage() {
  return (
    <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all tools
        </Link>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Word & Character Counter
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Instantly analyze your text. Count words, characters, sentences, and paragraphs in real-time. 100% private – your text never leaves your browser.
        </p>
      </div>

      <WordCounter />
    </main>
  );
}
