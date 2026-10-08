import PasswordGenerator from "@/components/PasswordGenerator";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strong Password Generator | WebToolKit",
  description: "Generate highly secure, random passwords entirely on your device for free.",
};

export default function PasswordGeneratorPage() {
  return (
    <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all tools
        </Link>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
          Strong Password Generator
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
          Create highly secure, random passwords instantly. The generation process uses cryptographically secure random number generation directly in your browser. No passwords are ever sent to a server.
        </p>
      </div>

      <PasswordGenerator />
    </main>
  );
}
