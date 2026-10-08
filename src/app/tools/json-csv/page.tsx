import JsonCsv from "@/components/JsonCsv";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to CSV Converter Online | WebToolKit",
  description: "Convert JSON arrays to CSV spreadsheets instantly in your browser. 100% private and free.",
};

export default function Page() {
  return (
    <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Link>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">JSON to CSV</h1>
      </div>
      <JsonCsv />
    </main>
  );
}
