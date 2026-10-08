import TimestampConverter from "@/components/TimestampConverter";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unix Timestamp Converter | WebToolKit",
  description: "Convert Unix epoch timestamps to human-readable dates and timezones online.",
};

export default function TimestampConverterPage() {
  return (
    <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all tools
        </Link>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
          Unix Timestamp Converter
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
          Instantly convert epoch timestamps to human-readable dates and vice versa. It auto-detects seconds vs milliseconds and outputs in your local timezone.
        </p>
      </div>

      <TimestampConverter />
    </main>
  );
}
