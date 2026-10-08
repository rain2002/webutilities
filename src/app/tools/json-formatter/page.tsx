import JsonFormatter from "@/components/JsonFormatter";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free JSON Formatter & Validator | WebToolKit",
  description: "Beautify, validate, and minify JSON data online. The fastest local JSON formatter.",
};

export default function JsonFormatterPage() {
  return (
    <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all tools
        </Link>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          JSON Formatter
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Format, validate, and minify your JSON data. Instantly prettify messy JSON with proper indentation. 100% private – runs directly in your browser.
        </p>
      </div>

      <JsonFormatter />
    </main>
  );
}
